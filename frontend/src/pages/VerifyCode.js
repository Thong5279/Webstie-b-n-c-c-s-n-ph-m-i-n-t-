import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const phone = localStorage.getItem('resetPasswordPhone');

  if (!phone) {
    navigate('/forgot-password');
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(SummaryApi.verifyCode.url, {
        method: SummaryApi.verifyCode.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone, code })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Xác thực thành công');
        navigate('/reset-password');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-[200px] bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Nhập Mã Xác Nhận</h2>
        
        <div className="mb-4">
          <p className="text-gray-600 text-center">
            Vui lòng kiểm tra email của bạn và nhập mã xác nhận 6 số
          </p>
        </div>

        <input
          type="text"
          placeholder="Nhập mã xác nhận"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 text-center text-2xl tracking-widest"
          maxLength="6"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 disabled:bg-gray-400"
        >
          {isLoading ? "Đang xử lý..." : "Xác nhận"}
        </button>
      </form>
    </div>
  );
};

export default VerifyCode; 