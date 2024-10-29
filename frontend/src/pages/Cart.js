import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayVNDCurrency from '../helpers/displayCurrency'
import { FaTrash } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa6";
import { ImQrcode } from "react-icons/im";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)
    const [userInfo, setUserInfo] = useState({
        phone: "",
        address: "",
        name: ""
    });


    const fetchData = async()=>{
       // setLoading(true)
       const response = await fetch(SummaryApi.addToCartProductView.url,{
        method : SummaryApi.addToCartProductView.method,
        credentials : "include",
        headers : {
            "Content-Type" : "application/json"
        },
     
       })

       //setLoading(false)


       const responseData = await response.json()

       // Sửa đổi điều kiện kiểm tra thành responseData.success
       if(responseData.success){ 
        setData(responseData.data)
       }
            
    }

    const handleLoading = async()=>{
        await fetchData()
    }
    useEffect(()=>{
        setLoading(true)
        handleLoading()
        fetchUserInfo()
        setLoading(false)
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
        if(qty > 1){
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
        //tong so luong san pham
    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantityCart,0)
    //tong gia tien
    const totalPrice = data.reduce((preve,curr) => preve + (curr.quantityCart * curr?.productId?.sellingPrice),0)

    const fetchUserInfo = async () => {
      try {
        console.log("Đang gọi API lấy thông tin user...");
        const response = await fetch(SummaryApi.getUserDetails.url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        });
        
        const responseData = await response.json();
        console.log("Dữ liệu user nhận được:", responseData);
        
        if (responseData.success) {
          setUserInfo({
            phone: responseData.data.phone || "",
            address: responseData.data.address || "",
            name: responseData.data.name || ""
          });
          console.log("Đã cập nhật userInfo:", {
            phone: responseData.data.phone,
            address: responseData.data.address,
            name: responseData.data.name
          });
        } else {
          console.error("Lỗi khi lấy thông tin:", responseData.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

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
                                loadingCart.map((el,index) =>{
                                    return(
                                        <div key={el+"Add to cart loading" + index} className='w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded'>

                                        </div>
                                    )
                                })
                            //   
                        ) : (
                           data.map((product,index)=>{
                            return(
                                <div className='flex'>
                                    <input type='checkbox' className="w-5 mx-4 bg-red-500 cursor-pointer"/>
                                    <div key={product?._id+"Add to cart loading"} className='w-full bg-white h-32 my-2 border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-full bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className='h-full object-cover' />
                                        </div>
                                        <div className='px-4 relative'>
                                            {/* delete product */}
                                            <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer transform hover:scale-110 transition duration-300' onClick={()=>deleteProduct(product?._id)}>
                                                <FaTrash />
                                            </div>
                                            <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p  className='text-red-600 font-medium text-lg'>{displayVNDCurrency(product?.productId?.sellingPrice)}</p>
                                                <p  className='text-slate-500 font-medium text-lg line-through'>{displayVNDCurrency(product?.productId?.price)}</p>
                                                <p  className='text-slate-600 font-semibold text-lg'>{displayVNDCurrency(product?.productId?.sellingPrice * product?.quantityCart)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-2'>
                                                <button className='border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white w-6 h-6 flex items-center justify-center transform hover:scale-110 transition duration-300 shadow-md' onClick={()=>decreaseQty(product?._id,product?.quantityCart)}>-</button>
                                                <span>{product?.quantityCart}</span>
                                                <button className='border border-red-500 rounded-full hover:bg-red-500 hover:text-white w-6 h-6 flex items-center justify-center transform hover:scale-110 transition duration-300 shadow-md' onClick={()=>increaseQty(product?._id,product?.quantityCart)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                           })
                        )
                    }    
                </div>


                {/*sumary product*/}
            <div className='mt-5 lg:mt-0 w-full max-w-full'>
            {
                    loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse '>
                        
                        </div>
                    ) : (
                        <div className='min-h-36 bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-1'>Tổng Đơn Hàng</h2>
                            <div className='flex items-center justify-between px-4 py-4 font-medium gap-2 text-lg text-slate-600'>
                                <p>Số Lượng:</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 py-4 font-medium gap-2 text-lg text-slate-600'>
                                <p className='flex items-center gap-2'>
                                    <FaUser className="text-red-500"/> Thông tin người nhận:
                                </p>
                                <p className="text-base">{userInfo.name}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 py-4 font-medium gap-2 text-lg text-slate-600'>
                                <p className='flex items-center gap-2'>
                                    <FaPhoneAlt className="text-red-500"/> Số điện thoại:
                                </p>
                                <p className="text-base">{userInfo.phone}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 py-4 font-medium gap-2 text-lg text-slate-600'>
                                <p className='flex items-center gap-2'>
                                    <FaMapMarkerAlt className="text-red-500"/> Địa chỉ nhận hàng:
                                </p>
                                <p className="text-base">{userInfo.address}</p>
                            </div>
                                {/* Ma giam gia */}
                            <div className='px-4 py-4 font-medium text-slate-600 flex items-center justify-between'>
                                <p className='pb-2 text-left flex items-center gap-2'><FaTicketAlt className="text-red-500"/> Mã Giảm Giá:</p>
                                <input placeholder='Nhập mã giảm giá' className='outline-none border border-solid p-3 w-[232px] focus:border-red-500 transition duration-300' />
                            </div>

                            <div className='px-4 flex items-center justify-between'>
                                <label className='text-slate-600 font-medium text-lg flex items-center gap-2'><FaTicketAlt className="text-red-500"/> Voucher Của Shop:</label>
                                <select className='ml-3 border border-solid hover:border-red-500 outline-none p-3 cursor-pointer w-[232px] transition duration-300'>
                                    <option>Chọn Voucher</option>
                                    <option>Giảm tối đa 5%</option>
                                    <option>Giảm tối đa 10% </option>
                                    <option>Giảm tối đa 15% </option>
                                </select>
                            </div>

                            <div className='px-4 flex my-10 flex-col'>
                                <div className='flex  items-center justify-between'>
                                    <label className='text-slate-600 font-medium text-lg flex items-center gap-2'><FaShippingFast className="text-red-500"/> Đơn vị vận chuyển:</label>
                                    <select className='ml-3 border border-solid hover:border-red-500 outline-none p-3 cursor-pointer w-[232px] transition duration-300'>
                                        <option>Chọn đơn vị vận chuyển</option>
                                        <option>Giao hàng nhanh</option>
                                        <option>NinJa Van</option>
                                        <option>Giao hàng tiết kiệm</option>
                                    </select>
                                </div>
                                   <div className='flex justify-between items-center pt-5'>
                                        <p className='flex text-slate-600 font-medium text-lg items-center gap-2'><FaTruck className="text-red-500"/> Phí vận chuyển:</p>
                                        <p className='text-slate-600 font-medium text-lg'></p>
                                   </div>
                            </div>
                            <div className='px-4 flex items-center justify-between my-10'>
                                <label className='text-slate-600 font-medium text-lg flex items-center gap-2'><FaMoneyBillWave className="text-red-500"/> Phương Thức Thanh Toán:</label>
                                <select className='ml-3 border border-solid hover:border-red-500 outline-none p-3 cursor-pointer w-[232px] transition duration-300'>
                                    <option>Thanh toán khi nhận hàng</option>
                                    <option>PayPal</option>
                                    <option>QR Pay</option>
                                    <option>Thẻ tín dụng/ghi nợ</option>
                                </select>
                            </div>

                            <div className='flex items-center justify-between px-4 py-4 font-medium gap-2 text-lg text-slate-600'>
                                <p className='flex items-center gap-2'><BiSolidCoinStack className="text-red-500"/> Tổng Cộng:</p>
                                <p>{displayVNDCurrency(totalPrice)}</p>
                            </div>
                            <button className='bg-red-600 w-full text-white p-3 mt-4 hover:bg-white hover:text-red-600 border-2 border-red-600 rounded-lg font-bold text-lg transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'><FaShoppingCart/> Thanh Toán</button>
                        </div>
                    )
                }
            </div>
               
        </div>
    </div>
  )
}

export default Cart
