import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import 'moment/locale/vi';
import { RiEdit2Fill } from "react-icons/ri";
import ChangeUserRole from '../components/ChangeUserRole';
const formattedDate = moment('2024-08-29').format('MMMM D, YYYY');



const AllUser = () => {                                     // Khởi tạo state để lưu trữ danh sách người dùng

  const [allUser,setAllUsers] = useState([])                 // Hàm bất đồng bộ để lấy danh sách tất cả người dùng

  const fetchAllUsers = async()=>{                             // Gửi yêu cầu GET tới API để lấy danh sách người dùng
    const fetchData = await fetch(SummaryApi.allUser.url,{
      method : SummaryApi.allUser.method,                                           // Sử dụng phương thức GET
      credentials  : 'include'                                                          // Bao gồm thông tin đăng nhập (cookies)
    })

    const dataResponse = await fetchData.json()                     // Chuyển đổi phản hồi thành JSON
    
    if(dataResponse.success){                                               // Nếu phản hồi thành công, cập nhật state với danh sách người dùng
      setAllUsers(dataResponse.data)
    }
    if(dataResponse.error){
        toast.error(dataResponse.message)
    }

    console.log(dataResponse)

  }

  useEffect(()=>{                                           // Sử dụng useEffect để gọi hàm fetchAllUsers khi component được render lần đầu
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


      <ChangeUserRole/>
    </div>
  )
}

export default AllUser