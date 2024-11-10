import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTransgender, FaCamera } from 'react-icons/fa';
import moment from 'moment';
import displayVNDCurrency from '../helpers/displayCurrency';

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
                setTotalPurchase(data.data.totalPurchase || 0);
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

    if (!userData) {
        return <div className="text-center py-8">Đang tải thông tin...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-600">
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
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <FaUser className="text-4xl text-gray-400" />
                                </div>
                            )}
                            {avatarLoading && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>
                        <button 
                            onClick={handleAvatarClick}
                            className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                        >
                            <FaCamera />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/jpeg,image/png,image/jpg"
                            className="hidden"
                        />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{userData?.name}</h3>
                    <p className="text-gray-500">{userData?.role}</p>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold uppercase">Thông tin cá nhân</h2>
                    <button
                        onClick={() => {
                            if (isEditing) {
                                // Reset form data khi hủy chỉnh sửa
                                setFormData({
                                    name: userData.name || '',
                                    email: userData.email || '',
                                    phone: userData.phone || '',
                                    address: userData.address || '',
                                    sex: userData.sex || 'Khác'
                                });
                            }
                            setIsEditing(!isEditing);
                        }}
                        className="text-red-600 hover:text-red-700"
                    >
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

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Thông tin thành viên</h3>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Ngày tham gia:</span>
                        <span className="font-medium">
                            {moment(joinDate).format("DD/MM/YYYY HH:mm:ss")}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Nhóm khách hàng:</span>
                        <span className="font-medium text-amber-600">{customerGroup}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Đã tích luỹ:</span>
                        <span className="font-medium text-red-600">
                            {displayVNDCurrency(totalPurchase)}
                        </span>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <p className="text-center text-gray-700 italic">
                        Cảm ơn quý khách đã tin tưởng và ủng hộ Mobile Store. 
                        Chúng tôi sẽ không ngừng nỗ lực để mang đến những sản phẩm 
                        và dịch vụ tốt nhất.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;