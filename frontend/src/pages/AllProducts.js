import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import { collapseToast } from 'react-toastify'
import AdminProductCard from '../components/AdminProductCard'

function AllProducts() {
  const[openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProducts] = useState([])

  const fetchAllProducts = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data", dataResponse)

    setAllProducts(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProducts()
  },[])

  return (
    <div>
      <div className='bg-white p-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Sản Phẩm</h2>
          <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Sản phẩm</button>
        </div>
    {/*all product*/}
      <div className='flex flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll justify-center'>
          {
            allProduct.map((product,index)=>{
              return(
               <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProducts}/>
              
              )
            })
          }
        </div>
      {/*upload san pham conponents*/}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)}fetchData={fetchAllProducts} />
        )
      }
     
    </div>
  )
}

export default AllProducts