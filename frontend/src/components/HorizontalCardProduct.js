import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct"
import displayVNDCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'


const HorizontalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

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
        
        <h2 className="text-2xl font-semibold py-4">{heading}</h2>

          <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

            <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block hover:bg-red-400 hover:text-white' onClick={scrollLeft}><FaAngleLeft /></button>
            <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block hover:bg-red-400 hover:text-white' onClick={scrollRight}><FaAngleRight /></button>

          {
                data.map((product,index)=>{
                    return(
                    <div className='w-full min-w-[280px] max-w-[340px] h-36 bg-white rounded-sm shadow flex'>
                        <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                            <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all'/>
                        </div>
                        <div className='p-4 grid'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black ' >{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium'>{displayVNDCurrency(product?.sellingPrice)}</p>
                                <p className='text-slate-500 line-through'>{displayVNDCurrency(product?.price)}</p>
                            </div>
                            <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>Add to card</button>
                        </div>
                    </div>
                    )
                })
            }
          </div>
       
    </div>
  )
}

export default HorizontalCardProduct