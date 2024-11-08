import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'

const OrderPage = () => {
  const [data,setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url,{
      method : SummaryApi.getOrder.method,
      credentials : "include"
    })

    const responseData = await response.json()

  console.log("danh sách đơn hàng",responseData)
}

  useEffect(() => {
    fetchOrderDetails()
  },[])

  return (
    <div>
        <h1>Đơn hàng của bạn</h1>
    </div>
  )
}

export default OrderPage