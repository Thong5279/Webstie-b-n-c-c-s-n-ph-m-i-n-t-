import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import 'moment/locale/vi';
import { RiEdit2Fill } from "react-icons/ri";
const formattedDate = moment('2024-08-29').format('MMMM D, YYYY');



const AllUser = () => {

  const [allUser,setAllUsers] = useState([])

  const fetchAllUsers = async()=>{
    const fetchData = await fetch(SummaryApi.allUser.url,{
      method : SummaryApi.allUser.method,
      credentials  : 'include'
    })

    const dataResponse = await fetchData.json()
    
    if(dataResponse.success){
      setAllUsers(dataResponse.data)
    }
    if(dataResponse.error){
        toast.error(dataResponse.message)
    }

    console.log(dataResponse)

  }

  useEffect(()=>{
    fetchAllUsers()
  },[])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
           <tr>
            <th>Sr</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Quyền</th>
            <th>Số điện thoại</th>
            <th>địa chỉ</th>
            <th>Ngày Đăng ký</th>
            <th>Chỉnh sửa</th>
           </tr>
        </thead>
        <tbody className=''>
          {
            allUser.map((el,index)=>{
              return(
                <tr>
                    <td>{index+1}</td>
                    <td> {el?.name}</td>
                    <td> {el?.email}</td>
                    <td> {el?.role}</td>
                    <td> {el?.name}</td>
                    <td> {moment(el?.updatedAt).format('lll')}</td>
                    <td> {moment(el?.createdAt).format('LL')}</td>
                    <td>
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white'>
                    <RiEdit2Fill />
                    </button>
                    </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default AllUser