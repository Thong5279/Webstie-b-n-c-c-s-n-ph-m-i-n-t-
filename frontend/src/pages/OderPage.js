import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
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
       <div>
        {
          data.map((item,index) => {
           return(
            <div >
             <p className='font-medium text-lg'>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
             <div>
              {
                item?.productDetails.map((product,index) => {
                  return(
                    <div>
                      <img src={product.image[0]} 
                      alt='product' 
                      className='w-20 h-20 bg-slate-300 rounded-md' 
                      />
                    </div>
                  )
                })
              }
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