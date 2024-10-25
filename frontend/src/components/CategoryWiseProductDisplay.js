// Import các thư viện và component cần thiết
import React, { useContext, useEffect, useRef, useState } from 'react' // Import React và các hook
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct" // Import hàm để lấy sản phẩm theo danh mục
import displayVNDCurrency from '../helpers/displayCurrency' // Import hàm hiển thị tiền tệ VND
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6' // Import icon mũi tên trái phải
import { Link } from 'react-router-dom' // Import component Link để tạo liên kết
import addToCart from '../helpers/addToCart' // Import hàm thêm vào giỏ hàng

// Component hiển thị sản phẩm theo danh mục
const CategoryWiseProductDisplay = ({category, heading}) => {
    // Các state để quản lý dữ liệu và trạng thái
    const [data,setData] = useState([]) // Dữ liệu sản phẩm
    const [loading,setLoading] = useState(true) // Trạng thái loading
    const loadingList = new Array(13).fill(null) // Mảng để hiển thị skeleton loading
    const [hoveredProduct, setHoveredProduct] = useState(null) // Sản phẩm đang được hover
    const [isZoomed, setIsZoomed] = useState(false) // Trạng thái phóng to

    // Hàm fetch dữ liệu sản phẩm
    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        console.log("horizontal data", categoryProduct.data)
        setData(categoryProduct?.data)
    }
     
    // Gọi fetchData khi component mount
    useEffect(()=>{
        fetchData()
    },[])

    // Xử lý sự kiện hover vào sản phẩm
    const handleProductHover = (productId) => {
        setHoveredProduct(productId)
    }

    // Xử lý sự kiện rời khỏi sản phẩm
    const handleProductLeave = () => {
        setHoveredProduct(null)
    }

    // Xử lý sự kiện phóng to/thu nhỏ
    const toggleZoom = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsZoomed(!isZoomed)
    }

  // Render component
  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className="text-2xl font-semibold py-4">{heading}</h2>

          <div className={`grid grid-cols-[repeat(auto-fill,minmax(300px,320px))] justify-between md:gap-6 overflow-scroll scrollbar-none transition-all ${isZoomed ? 'scale-110' : ''}`}>

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
                        className={`w-full min-w-[280px] max-w-[320px] bg-white rounded-sm shadow transition-all duration-300 ${hoveredProduct === product._id ? 'transform scale-105' : ''}`}
                        onMouseEnter={() => handleProductHover(product._id)}
                        onMouseLeave={handleProductLeave}
                    >
                        <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                            <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                        </div>
                        <div className='p-4 grid gap-3 '>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black ' >{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium'>{displayVNDCurrency(product?.sellingPrice)}</p>
                                {product?.price !== product?.sellingPrice && (<p className='text-slate-500 line-through'>{displayVNDCurrency(product?.price)}</p>)}  
                            </div>
                            <button 
                                className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full transition-all duration-300 transform hover:scale-105'
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    addToCart(e,product?._id)
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
    </div>
  )
}

export default CategoryWiseProductDisplay