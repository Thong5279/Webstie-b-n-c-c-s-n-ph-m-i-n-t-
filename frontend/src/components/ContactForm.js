import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${SummaryApi.createContact.url}`, {
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
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Liên hệ với chúng tôi</h2>
            
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Họ tên</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Số điện thoại</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nội dung</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
                Gửi liên hệ
            </button>
        </form>
    );
};

export default ContactForm;
