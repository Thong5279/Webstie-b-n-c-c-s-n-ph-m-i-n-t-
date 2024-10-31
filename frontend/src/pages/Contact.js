import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { BiPhone, BiEnvelope, BiMap } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';

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

    // Xu ly phone chi nhap so khong nhap duoc ki tu
    const handlePhone = (e) => {
        const { value } = e.target
        if(/^\d*$/.test(value)){
            setFormData({...formData, phone:value})
        }
    }
    // ClearInput
    const clearName = () => {
        setFormData({...formData, name: ''})
    }

    const clearEmail = () => {
        setFormData({...formData, email: ''})
    }
    const clearPhone = () => {
        setFormData({...formData, phone: ''})
    }

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
                    <h2 className="text-2xl font-bold mb-6 uppercase">Thông tin liên hệ</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <BiPhone className="text-2xl text-red-600" />
                            <div>
                                <h3 className="font-semibold">Điện thoại</h3>
                                <p>0337 61 52 79</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <BiEnvelope className="text-2xl text-red-600" />
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p>Thongdc2096n525@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <BiMap className="text-2xl text-red-600" />
                            <div>
                                <h3 className="font-semibold">Địa chỉ</h3>
                                <p>123 Đường ABC, Quận XYZ, TP.Cần Thơ</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form liên hệ */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 uppercase">Gửi liên hệ</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='relative'>
                            <label className="block text-gray-700 mb-2">Họ tên</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                required
                            />
                            {
                                formData.name && (
                                    <div className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer text-gray-300 text-sm" onClick={clearName}>
                                        <ImCross />
                                    </div>
                                )
                            }
                        </div>

                        <div className='relative'>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                required
                            />
                            {
                                formData.email && (
                                    <div className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer text-gray-300 text-sm" onClick={clearEmail}>
                                        <ImCross />
                                    </div>
                                )
                            }
                        </div>

                        <div className='relative'>
                            <label className="block text-gray-700 mb-2">Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handlePhone}
                                className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                                required
                            />
                            {
                                formData.phone && (
                                    <div className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer text-gray-300 text-sm" onClick={clearPhone}>
                                        <ImCross />
                                    </div>
                                )
                            }
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
