import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaHeart,FaRegHeart } from "react-icons/fa";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct"
import displayVNDCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'


const HorizontalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    // xử lý khi click vào trái tim
    const [likedItems,setLikedItems] = useState({})
    const handleHeart = (e, productId) => {
        e.preventDefault()
        setLikedItems((prev) => ({
            ...prev,
            [productId]: !prev[productId]
        }))
    }


    const {fetchUserAddToCart}  = useContext(Context)

    const handleAddToCart = async(e,id) =>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data", categoryProduct.data)
        setData(categoryProduct?.data)
    }
     //
    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
        
        <h2 className="text-2xl font-semibold py-4 animate-fade-in">{heading}</h2>

          <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all animate-slide-in-right' ref={scrollElement}>

            <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block hover:bg-red-400 hover:text-white transition-all duration-300 transform hover:scale-110 z-10' onClick={scrollLeft}><FaAngleLeft /></button>
            <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block hover:bg-red-400 hover:text-white transition-all duration-300 transform hover:scale-110 z-10' onClick={scrollRight}><FaAngleRight /></button>

          {
            loading ? (
                loadingList.map((product,index)=>{
                    return(
                    <div key={index} className='w-full min-w-[360px] max-w-[500px] h-36 bg-white rounded-sm shadow flex animate-pulse'>
                        <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse">
                           
                        </div>
                        <div className='p-4 grid w-full gap-2'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full' ></h2>
                            <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full' ></p>
                            <div className='flex gap-3 w-full'>
                                <p className='text-red-600 font-medium p-1 bg-slate-200 animate-pulse rounded-full w-full'></p>
                                {product?.price !== product?.sellingPrice && (
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 animate-pulse rounded-full w-full'></p>
                                )}
                            </div>
                            <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                    )
                })
            ) : (
                data.map((product,index)=>{
                    return(
                    <Link key={product._id} to={'product/'+product?._id} className='w-full min-w-[360px] max-w-[500px] h-36 bg-white rounded-sm shadow flex hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in'>
                        <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] overflow-hidden">
                            <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all duration-300 mix-blend-multiply'/>
                        </div>
                        <div className='p-4 grid'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black hover:text-red-600 transition-colors duration-300' >{product?.productName}</h2>
                                {/* Trai tim */}
                            <div className='flex items-center justify-between'>
                                    <p className='capitalize text-slate-500 hover:text-red-500 transition-colors duration-300'>{product?.category}</p>
                                    <div className={`cursor-pointer ${likedItems[product._id] ? 'text-red-500' : 'text-gray-500'}`} onClick={e => handleHeart(e,product._id)} >
                                        <FaRegHeart className='text-xl'/>  {/** Đang xử bỏ attribute của thẻ link cha trong thẻ div con */}
                                    </div>
                            </div>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium animate-pulse'>{displayVNDCurrency(product?.sellingPrice)}</p>
                                {product?.price !== product?.sellingPrice && (
                                    <p className='text-slate-500 line-through hover:text-slate-700 transition-colors duration-300'>{displayVNDCurrency(product?.price)}</p>
                                )}
                            </div>
                            <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-bounce' onClick={(e) => handleAddToCart(e,product?._id)}>Thêm vào giỏ hàng</button>
                        </div>
                    </Link>
                    )
                })
            )
               
            }
          </div>
       
    </div>
  )
}

export default HorizontalCardProduct