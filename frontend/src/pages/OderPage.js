import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayVNDCurrency from '../helpers/displayCurrency'

const translatePaymentStatus = (status) => {
  const statusMap = {
    'paid': 'Đã thanh toán',
    'unpaid': 'Chưa thanh toán',
    'pending': 'Đang xử lý',
    'failed': 'Thanh toán thất bại'
  };
  return statusMap[status] || status;
};

const formatOrderId = (id) => {
  // Lấy 8 ký tự cuối của ID
  return `#${id.slice(-8).toUpperCase()}`;
};

const OrderPage = () => {
  const [data,setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url,{
      method : SummaryApi.getOrder.method,
      credentials : "include"
    })

    const responseData = await response.json()
  
    setData(responseData.data)

  console.log("danh sách đơn hàng",responseData)
}

  useEffect(() => {
    fetchOrderDetails()
  },[])

  return (
    <div>
       {
        !data[0] && (
         <p>Không có đơn hàng nào</p>
        )
       }
       <div className='p-4 w-full '>
        {
          data.map((item,index) => {
           return(
            <div key={index.userId+index} className=''>
             <div className='flex justify-between items-center'>
               <p className='font-medium text-lg'>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
               <p className='text-gray-600'>Mã đơn hàng: <span className='font-medium text-black'>{formatOrderId(item._id)}</span></p>
             </div>
             <div className='border rounded'>
             <div className='grid gap-2'>
                 {
                   item?.productDetails.map((product,index) => {
                     return(
                       <div key={product.productId+index} className='flex gap-3 bg-slate-100'>
                         <img src={product.image[0]} 
                         alt='product' 
                         className='w-28 h-28 bg-slate-300 object-scale-down p-2 ' 
                         />
                           <div>
                               <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                               <div className='flex items-center gap-5 mt-2'>
                               <div className='text-red-500 font-medium'>{displayVNDCurrency(product.price)}</div>
                               <p>Số lượng: {product.quantity}</p>
                               </div>
                           </div>
                       </div>
                     )
                   })
                 }
                 <div className='flex flex-col lg:flex-row gap-3 p-4'>
                   <div>
                     <div className='font-medium text-lg'>Chi tiết thanh toán</div>
                     <p className='mt-2 font-medium ml-1'>Phương thức thanh toán: {item.paymentDetails.payment_method_type[0]}</p>
                     <p className='mt-2 font-medium ml-1'>Trạng thái thanh toán: {translatePaymentStatus(item.paymentDetails.payment_status)}</p>
                   </div>
                 </div>
              </div>

              <div className='font-medium text-lg mt-2'>
               Tổng tiền: {displayVNDCurrency(item.totalAmount)}
              </div>
             </div>
             </div>
            )
           })
         } 
       </div>
     </div>

     
   )
 }

 export default OrderPage