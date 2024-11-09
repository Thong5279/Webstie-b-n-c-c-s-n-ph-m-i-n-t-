import React from 'react'
import CANCELIMG from '../img/cancel_gif.gif'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white w-full max-w-md mx-auto flex flex-col gap-6 p-8 rounded-xl shadow-lg border border-gray-200'>
        <div className='flex justify-center'>
          <img 
            src={CANCELIMG} 
            width={180} 
            height={180} 
            className='animate-bounce'
            alt="Payment Failed"
          />
        </div>
        
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-bold text-red-500'>Thanh toán thất bại</h1>
          <p className='text-gray-600'>Rất tiếc, giao dịch của bạn không thể hoàn thành. Vui lòng thử lại sau.</p>
        </div>

        <div className='flex flex-col gap-3'>
          <Link 
            to="/" 
            className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-center font-medium transition-colors duration-200'
          >
            Tiếp tục mua sắm
          </Link>
          <Link 
            to="/contact" 
            className='text-gray-600 hover:text-red-500 text-center text-sm transition-colors duration-200'
          >
            Liên hệ hỗ trợ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cancel