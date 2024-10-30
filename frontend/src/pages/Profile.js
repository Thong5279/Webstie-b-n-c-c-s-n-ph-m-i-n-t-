import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTransgender, FaCamera } from 'react-icons/fa';

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

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const response = await fetch(SummaryApi.getUserDetails.url, {
                method: SummaryApi.getUserDetails.method,
                credentials: 'include'
            });
            const data = await response.json();

            if (data.success) {
                setUserData(data.data);
                setFormData({
                    name: data.data.name || '',
                    email: data.data.email || '',
                    phone: data.data.phone || '',
                    address: data.data.address || '',
                    sex: data.data.sex || 'Khác'
                });
            } else {
                toast.error("Không thể tải thông tin người dùng");
            }
        } catch (error) {
            toast.error("Lỗi khi tải thông tin người dùng");
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

        // Kiểm tra kích thước file (ví dụ: giới hạn 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Kích thước ảnh không được vượt quá 2MB');
            return;
        }

        // Kiểm tra định dạng file
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            toast.error('Chỉ chấp nhận file ảnh định dạng JPG, JPEG hoặc PNG');
            return;
        }

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
                    <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
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
                    <div className="flex items-center space-x-4">
                        <FaUser className="text-red-600 text-xl" />
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Họ tên</label>
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
                                <p className="p-2">{userData.name}</p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-4">
                        <FaEnvelope className="text-red-600 text-xl" />
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Email</label>
                            <p className="p-2">{userData.email}</p>
                        </div>
                    </div>

                    {/* Số điện thoại */}
                    <div className="flex items-center space-x-4">
                        <FaPhone className="text-red-600 text-xl" />
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Số điện thoại</label>
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
                                <p className="p-2">{userData.phone}</p>
                            )}
                        </div>
                    </div>

                    {/* Địa chỉ */}
                    <div className="flex items-center space-x-4">
                        <FaMapMarkerAlt className="text-red-600 text-xl" />
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Địa chỉ</label>
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
                                <p className="p-2">{userData.address}</p>
                            )}
                        </div>
                    </div>

                    {/* Giới tính */}
                    <div className="flex items-center space-x-4">
                        <FaTransgender className="text-red-600 text-xl" />
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Giới tính</label>
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
                                <p className="p-2">{userData.sex}</p>
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
        </div>
    );
};

export default Profile;