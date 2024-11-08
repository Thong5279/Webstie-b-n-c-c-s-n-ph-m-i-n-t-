import React from 'react'
import CANCELIMG from '../img/cancel_gif.gif'
import { Link } from 'react-router-dom'
const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto justify-center items-center flex flex-col gap-4 p-4 rounded-lg'>
        <img src={CANCELIMG} width={150} height={150}/>
        <p className='text-2xl font-bold text-red-500'>Thanh toán thất bại</p>
        <Link to="/" className='bg-red-500 text-white px-4 py-2 rounded-md'>Tiếp tục mua sắm</Link>
    </div>
  )
}

export default Cancel