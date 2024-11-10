import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTransgender, FaCamera, FaUserCircle, FaPen, FaCalendarAlt, FaStar, FaCoins, FaHeart, FaCrown } from 'react-icons/fa';
import moment from 'moment';
import displayVNDCurrency from '../helpers/displayCurrency';
import { calculatePoints, determineCustomerTier, calculateNextTierProgress } from '../helpers/membershipUtils';


const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        sex: 'Khác'
    });
    const [avatarLoading, setAvatarLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [joinDate, setJoinDate] = useState("");
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [customerGroup] = useState("Khách Hàng VIP Đồng");
    const [points, setPoints] = useState(0);
    const [currentTier, setCurrentTier] = useState(null);
    const [nextTierProgress, setNextTierProgress] = useState(null);

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const response = await fetch(SummaryApi.current_user.url, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            
            if (data.success) {
                setUserData(data.data);
                setJoinDate(data.data.createdAt);
                const totalSpent = data.data.totalPurchase || 0;
                setTotalPurchase(totalSpent);
                
                // Tính điểm và xác định hạng
                const earnedPoints = calculatePoints(totalSpent);
                setPoints(earnedPoints);
                
                const tier = determineCustomerTier(totalSpent);
                setCurrentTier(tier);
                
                const progress = calculateNextTierProgress(totalSpent);
                setNextTierProgress(progress);
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.updateProfile.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Cập nhật thông tin thành công!');
                setIsEditing(false);
                fetchUserData(); // Tải lại thông tin sau khi cập nhật
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật thông tin');
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Kích thước ảnh không được vượt quá 5MB');
            return;
        }

        toast.info('Vui lòng chọn ảnh phù hợp, không phản cảm');

        setAvatarLoading(true);
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch(SummaryApi.updateAvatar.url, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Cập nhật ảnh đại diện thành công!');
                fetchUserData(); // Tải lại thông tin user để cập nhật ảnh mới
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật ảnh đại diện');
        } finally {
            setAvatarLoading(false);
        }
    };

    const MembershipProgress = ({ currentTier, nextTierProgress, points }) => {
        return (
            <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Điểm tích lũy:</span>
                    <span className="font-bold text-red-600">{points.toLocaleString()} điểm</span>
                </div>
                
                {nextTierProgress?.nextTier && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Hạng hiện tại: 
                                <span className={`font-medium ml-1 ${currentTier?.color}`}>
                                    {currentTier?.icon} {currentTier?.name}
                                </span>
                            </span>
                            <span>Hạng tiếp theo: 
                                <span className={`font-medium ml-1 ${nextTierProgress.nextTier.color}`}>
                                    {nextTierProgress.nextTier.icon} {nextTierProgress.nextTier.name}
                                </span>
                            </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-red-600 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${nextTierProgress.progress}%` }}
                            ></div>
                        </div>
                        
                        <p className="text-sm text-gray-600">
                            Cần chi tiêu thêm {displayVNDCurrency(nextTierProgress.remainingAmount)} để lên hạng {nextTierProgress.nextTier.name}
                        </p>
                    </div>
                )}

                {!nextTierProgress?.nextTier && (
                    <div className="text-center text-gray-600">
                        <p>Chúc mừng! Bạn đã đạt hạng thành viên cao nhất</p>
                        <p className="text-2xl mt-2">{currentTier?.icon}</p>
                    </div>
                )}
            </div>
        );
    };

    if (!userData) {
        return <div className="text-center py-8">Đang tải thông tin...</div>;
    }

    return (
        <div className="container mx-auto p-4 min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-xl p-8 text-white shadow-lg">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-inner transition-transform group-hover:scale-105">
                                {userData?.profilePic ? (
                                    <img 
                                        src={userData.profilePic.startsWith('data:') 
                                            ? userData.profilePic 
                                            : `${SummaryApi.baseURL}/${userData.profilePic}`
                                        }
                                        alt="Avatar" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-white/20 flex items-center justify-center">
                                        <FaUser className="text-4xl text-white/70" />
                                    </div>
                                )}
                            </div>
                            <button 
                                onClick={handleAvatarClick}
                                className="absolute bottom-0 right-0 bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-50 transition-all duration-300"
                            >
                                <FaCamera className="text-xl" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                accept="image/jpeg,image/png,image/jpg"
                                className="hidden"
                            />
                        </div>
                        
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold mb-2">{userData?.name}</h1>
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <span className="flex items-center gap-1">
                                    <FaEnvelope /> {userData?.email}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaPhone /> {userData?.phone}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thông tin chi tiết */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Thông tin cá nhân */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <FaUserCircle className="text-red-500" />
                                Thông tin cá nhân
                            </h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-red-500 hover:text-red-600 flex items-center gap-1"
                            >
                                <FaPen className="text-sm" />
                                {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Họ tên */}
                            <div className="flex space-x-4 border-b-[1px] pb-3">
                                <FaUser className="text-red-600 text-xl" />
                                <div className="flex-1">
                                    <label className="block text-slate-700 mb-1 text-lg uppercase font-semibold">Họ tên</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                            required
                                        />
                                    ) : (
                                        <p className="">{userData.name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex space-x-4 border-b-[1px] pb-3">
                                <FaEnvelope className="text-red-600 text-xl" />
                                <div className="flex-1">
                                    <label className="block mb-1 text-slate-700 text-lg uppercase font-semibold">Email</label>
                                    <p className="">{userData.email}</p>
                                </div>
                            </div>

                            {/* Số điện thoại */}
                            <div className="flex space-x-4 border-b-[1px] pb-3">
                                <FaPhone className="text-red-600 text-xl" />
                                <div className="flex-1">
                                    <label className="block mb-1 text-slate-700 text-lg uppercase font-semibold">Số điện thoại</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                            required
                                        />
                                    ) : (
                                        <p className="">{userData.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* Địa chỉ */}
                            <div className="flex space-x-4 border-b-[1px] pb-3">
                                <FaMapMarkerAlt className="text-red-600 text-xl" />
                                <div className="flex-1">
                                    <label className="block mb-1 text-slate-700 text-lg uppercase font-semibold">Địa chỉ</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                            required
                                        />
                                    ) : (
                                        <p className="">{userData.address}</p>
                                    )}
                                </div>
                            </div>

                            {/* Giới tính */}
                            <div className="flex space-x-4">
                                <FaTransgender className="text-red-600 text-xl" />
                                <div className="flex-1">
                                    <label className="block mb-1 text-slate-700 text-lg uppercase font-semibold">Giới tính</label>
                                    {isEditing ? (
                                        <select
                                            name="sex"
                                            value={formData.sex}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                        >
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    ) : (
                                        <p className="">{userData.sex}</p>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Thông tin thành viên */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <FaCrown className={currentTier?.color || "text-amber-500"} />
                            Thông tin thành viên {currentTier?.icon}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <FaCalendarAlt className="text-red-500" />
                                    Ngày tham gia:
                                </span>
                                <span className="font-medium">
                                    {moment(joinDate).format("DD/MM/YYYY HH:mm:ss")}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <FaStar className={currentTier?.color || "text-amber-500"} />
                                    Hạng thành viên:
                                </span>
                                <span className={`font-medium ${currentTier?.color}`}>
                                    {currentTier?.icon} {currentTier?.name}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <FaCoins className="text-red-500" />
                                    Đã tích luỹ:
                                </span>
                                <span className="font-medium text-red-600">
                                    {displayVNDCurrency(totalPurchase)}
                                </span>
                            </div>
                        </div>

                        <MembershipProgress 
                            currentTier={currentTier}
                            nextTierProgress={nextTierProgress}
                            points={points}
                        />

                        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
                            <div className="flex items-center gap-2 text-red-500 mb-2">
                                <FaHeart className="text-xl" />
                                <p className="font-semibold">Cảm ơn quý khách!</p>
                            </div>
                            <p className="text-gray-700 italic">
                                Cảm ơn quý khách đã tin tưởng và ủng hộ Mobile Store. 
                                Chúng tôi sẽ không ngừng nỗ lực để mang đến những sản phẩm 
                                và dịch vụ tốt nhất.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;