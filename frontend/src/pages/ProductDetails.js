import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar,FaStarHalf } from "react-icons/fa";
import displayVNDCurrency from '../helpers/displayCurrency';

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "", //ten sp 
    brandName : "",     //ten hang
    category : "",     //so luong
    quantity : "",  
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")
  const [zoomImagecoordinate,setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })

  const [zoomImg,setZoomImg] = useState(false)


  console.log('Product id', params);
  

  const fetchProductDetails = async() => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataReponse = await response.json()

    setData(dataReponse?.data)
    setActiveImage(dataReponse?.data.productImage[0])
  }

  console.log("data", data);
  

  useEffect(() => {
    fetchProductDetails()
  },[])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImg(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log('coordinate', left, top,width,height);
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImagecoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImg(false)
  }
  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Hinh anh san pham */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
              <img src= {activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

              {/* Product Zoom */}
              {
                zoomImg && (
                   <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] px-1 -right-[510px] top-0 z-10'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] bg-slate-200 mix-blend-multiply scale-125'
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImagecoordinate.x * 100}%  ${zoomImagecoordinate.y * 100}%`
                }}
                >
                </div>
              </div>
                )
              }
             
          </div>

          <div className='h-full'>
              {
                loading ? (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      productImageListLoading.map(el => {
                        return(
                          <div className='h-20 w-20 bg-slate-300 rounded animate-pulse' key={"loadingImage"}>
    
                          </div>
                        )
                      })
                    }
                  </div>
                ): (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL,index) => {
                      return(
                        <div className='h-20 w-20 bg-slate-300 rounded p-1' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)}/>
                        </div>
                      )
                    })
                  }
                </div>
                )
              }
          </div>
        </div>
        {/* chi tiet san pham */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>

              <div className='flex text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse items-center gap-1 w-full'>
                
              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse'>
                <p className='text-red-600 bg-slate-200 w-full'></p>
                <p className='line-through opacity-45 text-xl bg-slate-200 w-full'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
              </div>

              <div className='w-full'>
                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
                <p className='h-10 lg:h-12 bg-slate-200 rounded animate-pulse w-full'></p>
              </div>
        </div>
          ): 
          (
            <div className='flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 p-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>

              <div className='flex text-red-600 items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                <p className='text-red-600'>{displayVNDCurrency(data.sellingPrice)}</p>
                <p className='line-through opacity-45 text-xl'>{displayVNDCurrency(data.price)}</p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Mua</button>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:bg-white hover:text-red-600'>Thêm vào giỏ hàng</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'>Mô tả của sản phẩm:</p>
                <p>{data?.description}</p>
              </div>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default ProductDetails