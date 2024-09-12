import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

function AllProducts() {
  const[openUploadProduct,setOpenUploadProduct] = useState(false)
  return (
    <div>
      <div className='bg-white p-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Sản Phẩm</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Sản phẩm</button>
      </div>


      {/*upload san pham conponents*/}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} />
        )
      }
     
    </div>
  )
}

export default AllProducts