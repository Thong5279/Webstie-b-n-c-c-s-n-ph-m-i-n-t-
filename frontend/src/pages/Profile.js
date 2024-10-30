import React, { useState, useContext } from 'react';
import Context from '../context';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTransgender } from 'react-icons/fa';

const Profile = () => {
    const { user, fetchUserDetails } = useContext(Context);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        sex: user?.sex || 'Khác'
    });

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
                fetchUserDetails(); // Cập nhật lại thông tin user trong context
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật thông tin');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
                    <button
                        onClick={() => {
                            if (isEditing) {
                                setFormData({
                                    name: user?.name || '',
                                    email: user?.email || '',
                                    phone: user?.phone || '',
                                    address: user?.address || '',
                                    sex: user?.sex || 'Khác'
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
                                <p className="p-2">{user?.name}</p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-4">
                        <FaEnvelope className="text-red-600 text-xl" />
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Email</label>
                            <p className="p-2">{user?.email}</p>
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
                                <p className="p-2">{user?.phone}</p>
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
                                <p className="p-2">{user?.address}</p>
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
                                <p className="p-2">{user?.sex}</p>
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