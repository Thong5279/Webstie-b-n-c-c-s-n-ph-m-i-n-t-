import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import ROLE from '../common/role'
import SummaryApi from '../common';
const ChangeUserRole = ({                                   // Component để thay đổi quyền của người dùng
                name,
                email,
                role,
                onClose,

}) => {                         
    const [userRole,setUserRole] = useState(role)       // Khởi tạo state để lưu trữ quyền người dùng hiện tại
    
    const handleOnChangeSelect = (e)=>{                  // Hàm xử lý sự kiện thay đổi lựa chọn quyền
        setUserRole(e.target.value)             // Cập nhật state với quyền được chọn

        console.log(e.target.value)                 // Ghi ra console quyền đã chọn
    }

    const updateUserRole = async() =>{                                                    // Hàm để cập nhật quyền người dùng
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{                    // Gửi yêu cầu POST để cập nhật quyền người dùng
            method : SummaryApi.updateUser.method,                                          // Phương thức HTTP
            credentials : 'include',                                                        // Bao gồm thông tin đăng nhập (cookies)
            headers : {
                "content-type" : "application/json"                                         
            },
            body : JSON.stringify({
                role : userRole          //Gửi quyền người dùng mới trong body của yêu cầu
            })
        })
        // Chuyển đổi phản hồi thành JSON
        const responseData = await fetchResponse.json() // Ghi ra console thông tin phản hồi từ server
            
        console.log("role updated",responseData) // Xử lý lỗi nếu có

    }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

            <button className='block ml-auto'onClick={onClose}>
                <IoClose />
            </button>

            <h1 className='pb-4 text-lg font-medium'>Cấp quyền cho người dùng</h1>
            <p>Name : {name}</p>
            <p>Email: {email}</p>
            

            <div className='flex items-center justify-between my-4'>
            <p>Quyền</p>
            <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>

                {   // Duyệt qua tất cả các giá trị trong đối tượng ROLE và hiển thị dưới dạng các tùy chọn
                    Object.values(ROLE).map(el => {
                        return(
                            <option value={el} key={el}>{el}</option>           // Hiển thị mỗi quyền (role) dưới dạng một thẻ <option>
                        )
                    })
                }
                
            </select>
            </div>


            <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700'onClick={updateUserRole}>Cấp quyền</button>
        </div>
    </div>
  )
}

export default ChangeUserRole