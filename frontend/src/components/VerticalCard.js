import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import Context from '../context'
import displayVNDCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
import {useState} from 'react'

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null) // Mảng để hiển thị skeleton loading
    const [hoveredProduct, setHoveredProduct] = useState(null)
    const [isZoomed, setIsZoomed] = useState(false)
    const handleProductHover = (productId) => {
        setHoveredProduct(productId)
    }
    const handleProductLeave = () => {
        setHoveredProduct(null)
    }
    const {fetchUserAddToCart}  = useContext(Context)

    const handleAddToCart = async(e,id) =>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }
    const toggleZoom = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsZoomed(!isZoomed)
    }
  return (
    <div className={`grid grid-cols-[repeat(auto-fill,minmax(260px,300px))] justify-center md:justify-between md:gap-2 overflow-scroll scrollbar-none transition-all ${isZoomed ? 'scale-110' : ''}`}>

          {/* Nút phóng to/thu nhỏ */}
          <button onClick={toggleZoom} className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition-all z-10">
            {isZoomed ? 'Thu nhỏ' : 'Phóng to'}
          </button>

          {/* Hiển thị skeleton loading hoặc danh sách sản phẩm */}
          {
            loading ? (
                // Hiển thị skeleton loading
                loadingList.map((product,index)=>{
                    return(
                    <div key={index} className='w-full min-w-[280px] max-w-[320px] bg-white rounded-sm shadow '>
                        <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse">
                        </div>
                        <div className='p-4 grid gap-3 '>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200' ></h2>
                            <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                {product?.price !== product?.sellingPrice && (<p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>)}  
                            </div>
                            <button className='text-sm text-white px-3 py-0.5 rounded-full bg-slate-200 py-2 animate-pulse '></button>
                        </div>
                    </div>
                    )
                })
            ) : (
                // Hiển thị danh sách sản phẩm
                data.map((product,index)=>{
                    return(
                    <Link 
                        key={product._id}
                        to={'/product/'+product?._id} 
                        className={`w-full min-w-[280px] max-w-[328px] md:min-w[300px] md:max-w[300px] bg-white rounded-sm shadow transition-all duration-300 ${hoveredProduct === product._id ? 'transform scale-105' : ''}`}
                        onMouseEnter={() => handleProductHover(product._id)}
                        onMouseLeave={handleProductLeave}
                        onClick={scrollTop}
                    >
                        <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                            <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                        </div>
                        <div className='p-4 grid gap-3 '>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black '>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium'>{displayVNDCurrency(product?.sellingPrice)}</p>
                                {product?.price !== product?.sellingPrice && (<p className='text-slate-500 line-through'>{displayVNDCurrency(product?.price)}</p>)}  
                            </div>
                            <button 
                                className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full transition-all duration-300 transform hover:scale-105'
                                onClick={(e) => {
                                    handleAddToCart(e,product?._id)
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </Link>
                    )
                })
            )
          }
          </div>
  )
}

export default VerticalCard