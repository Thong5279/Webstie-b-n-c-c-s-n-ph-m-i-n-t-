import React from 'react'
import SUCCESIMG from '../img/succes_gif.gif'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white w-full max-w-md mx-auto flex flex-col gap-6 p-8 rounded-xl shadow-lg border border-gray-200'>
        <div className='flex justify-center'>
          <img 
            src={SUCCESIMG} 
            width={180} 
            height={180} 
            className='animate-bounce'
            alt="Payment Success"
          />
        </div>
        
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-bold text-green-500'>Thanh toán thành công!</h1>
          <p className='text-gray-600'>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
        </div>

        <div className='flex flex-col gap-3'>
          <Link 
            to="/order" 
            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium transition-colors duration-200'
          >
            Xem lại đơn hàng
          </Link>
          <Link 
            to="/" 
            className='bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-center font-medium transition-colors duration-200'
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Success