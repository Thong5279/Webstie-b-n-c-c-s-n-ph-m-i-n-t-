import React from 'react'

const Footer = () => {
  return (
  <footer className='bg-slate-200'>
    <div className='container mx-auto p-4 flex justify-evenly'>
      <div>
        <ul className='flex flex-col'>
          <h2 className='font-bold text-[20px] mb-2'>Gallery</h2>
          <li className='text-base mb-2 hover:text-red-700 cursor-pointer'>Comumunity</li>
          <li className='text-base mb-2 hover:text-red-700 cursor-pointer'>Trending</li>
          <li className='text-base mb-2 hover:text-red-700 cursor-pointer'>Picks</li>
        </ul>
      </div>
      <div>
        <ul className='flex flex-col'>
          <h2 className='font-bold text-[20px] mb-2'>Gallery</h2>
          <li className='text-base mb-2 hover:text-red-700 cursor-pointer'>Comumunity</li>
          <li className='text-base mb-2 hover:text-red-700 cursor-pointer'>Trending</li>
          <li className='text-base mb-2 hover:text-red-700 cursor-pointer'>Picks</li>
        </ul>
      </div>
      <div>
        <ul className='flex flex-col'>
          <h2 className='font-bold text-[20px] mb-2'>Gallery</h2>
          <li className='text-base mb-2 hover:text-red-700 cursor-pointer'>Comumunity</li>
          <li className='text-base mb-2 hover:text-red-700 cursor-pointer'>Trending</li>
          <li className='text-base mb-2 hover:text-red-700 cursor-pointer'>Picks</li>
        </ul>
      </div>
      <div className='flex flex-col'>
        <h2 className='font-bold text-[20px] mb-2'>Newsletter</h2>
        <p className='mb-5'>Mô tả về trang web</p>
        <input placeholder='Nhập email của bạn ' className='p-2 rounded-sm text-base mb-2'></input>
        <button className='w-full p-2 bg-red-600 text-white rounded-sm'>Đăng Ký</button>
      </div>
    </div>
    <hr className='container mx-auto w-full border border-black'/>
    <div className='flex mx-auto container '>
      <p>Privacy Policy</p>
      <p className='text-right'>Privacy Policy</p>
    </div>
  </footer>
  )
}

export default Footer