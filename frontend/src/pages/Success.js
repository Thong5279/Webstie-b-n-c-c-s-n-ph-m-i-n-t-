import React from 'react'
import SUCCESIMG from '../img/succes_gif.gif'
import { Link } from 'react-router-dom'
const Success= () => {
  return ( 
    <div className='bg-slate-200 w-full max-w-md mx-auto justify-center items-center flex flex-col gap-4 p-4 rounded-lg'>
        <img src={SUCCESIMG} width={150} height={150}/>
        <p className='text-2xl font-bold text-green-500'>Thanh toán thành công</p>
        <Link to="/order" className='bg-blue-500 text-white px-4 py-2 rounded-md'>Xem lại đơn hàng</Link>
        <Link to="/" className='bg-green-500 text-white px-4 py-2 rounded-md'>Tiếp tục mua sắm</Link>
      
    </div>
  )
}

export default Success