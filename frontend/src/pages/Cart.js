import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayVNDCurrency from '../helpers/displayCurrency'
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)


    const fetchData = async()=>{
        setLoading(true)
       const response = await fetch(SummaryApi.addToCartProductView.url,{
        method : SummaryApi.addToCartProductView.method,
        credentials : "include",
        headers : {
            "Content-Type" : "application/json"
        },
     
       })

       setLoading(false)


       const responseData = await response.json()

       // Sửa đổi điều kiện kiểm tra thành responseData.success
       if(responseData.success){ 
        setData(responseData.data)
       }
            
    }

    
    useEffect(()=>{
        fetchData()
       },[])

    const increaseQty = async(id,qty)=>{
        const response = await fetch(SummaryApi.updateAddToCartProduct.url,{
            method : SummaryApi.updateAddToCartProduct.method,
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(
                {
                    _id : id,
                    quantityCart : qty + 1
                }
        )
        })
        const responseData = await response.json()


        if(responseData.success){
            fetchData()
        }
    }
    const decreaseQty = async(id,qty)=>{
        if(qty > 2){
            const response = await fetch(SummaryApi.updateAddToCartProduct.url,{
                method : SummaryApi.updateAddToCartProduct.method,
                credentials : "include",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(
                    {
                        _id : id,
                        quantityCart : qty - 1
                    }
            )
            })
            const responseData = await response.json()


            if(responseData.success){
                fetchData()
            }
        }
    }
    const deleteProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteAddToCartProduct.url,{
            method : SummaryApi.deleteAddToCartProduct.method,
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(
                {
                    _id : id,
                }
        )
        })
        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }
    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue?.quantityCart,0)
  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>no data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/*  view cart product*/}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                                loadingCart.map(el =>{
                                    return(
                                        <div key={el+"Add to cart loading"} className='w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded'>

                                        </div>
                                    )
                                })
                              
                        ) : (
                           data.map((product,index)=>{
                            return(
                                <div key={product?._id+"Add to cart loading"} className='w-full bg-white h-32 my-2 border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} />
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        {/* delete product */}
                                        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteProduct(product?._id)}>
                                             <FaTrash />
                                        </div>
                                        <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <p  className='text-red-600 font-medium text-lg'>{displayVNDCurrency(product?.productId?.price)}</p>
                                        <div className='flex items-center gap-3 mt-2'>
                                            <button className=' border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white w-6 h-6 flex items-center justify-center' onClick={()=>decreaseQty(product?._id,product?.quantityCart)}>-</button>
                                            <span>{product?.quantityCart}</span>
                                            <button className=' border border-red-500 rounded-full hover:bg-red-500 hover:text-white w-6 h-6 flex items-center justify-center' onClick={()=>increaseQty(product?._id,product?.quantityCart)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            )
                           })
                        )
                    }    
                </div>


                {/*sumary product*/}
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
            {
                    loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse '>
                        
                        </div>
                    ) : (
                        <div className='h-36 bg-white'>
                        <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                        <div>
                            <p>Quantity</p>
                            <p>{totalQty}</p>
                        </div>
                        </div>
                    )
                }
            </div>
               
        </div>
    </div>
  )
}

export default Cart
