import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { BiPhone, BiEnvelope, BiMap } from 'react-icons/bi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

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
            const response = await fetch(SummaryApi.createContact.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Gửi liên hệ thành công!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi gửi liên hệ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Thông tin liên hệ */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <BiPhone className="text-2xl text-red-600" />
                            <div>
                                <h3 className="font-semibold">Điện thoại</h3>
                                <p>0123 456 789</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <BiEnvelope className="text-2xl text-red-600" />
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p>contact@example.com</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <BiMap className="text-2xl text-red-600" />
                            <div>
                                <h3 className="font-semibold">Địa chỉ</h3>
                                <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form liên hệ */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Gửi liên hệ</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Họ tên</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Nội dung</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Đang gửi...' : 'Gửi liên hệ'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
