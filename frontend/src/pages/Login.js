import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm import này
import loginIcons from '../img/assest/signin.gif';
import { IoEye, IoEyeOff } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data,setData] = useState({
    email : "",
    password : ""
})
  const navigate = useNavigate()
const handleOnChange = (e) =>{
    const { name , value } = e.target

    setData((preve)=>{
        return{
            ...preve,
            [name] : value
        }
    })
}
const handleSubmit = async(e) =>{
   e.preventDefault() //Loại bỏ hành vi mặc định của nút submit
   const dataResponse = await fetch(SummaryApi.signIn.url,{
    method: SummaryApi.signIn.method, //phương thức gửi đi để kiểm tra dữ liệu 
    credentials : 'include',
    headers: {
      "content-type" : "application/json"
    },
    body : JSON.stringify(data) // Chuyển đổi từ kiểu javascript sang kiểu json
   })

   const dataApi = await dataResponse.json()
  //  Nếu đăng nhập thành công thì vào trang chủ
   if(dataApi.success){
    toast.success(dataApi.message)
    navigate('/')
   }
  //  Nếu đăng nhập thất bại thì hiển thị message lỗi
   if(dataApi.error){
    toast.error(dataApi.message)
   }
    
}
console.log("data login",data)
  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-md'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons' />
          </div>
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              {/* Email trang Đăng nhập*/}
              <label>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email' 
                  placeholder='Nhập email của bạn' 
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
              {/* Mật khẩu trang Đăng nhập*/}
            <div>
              <label>Mật Khẩu :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Nhập mật khẩu'
                  className='w-full h-full outline-none bg-transparent'
                  onChange={handleOnChange}
                  name='password'
                  value={data.password}
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  <span>
                    {showPassword ? <IoEye /> : <IoEyeOff />}
                  </span>
                </div>
              </div>
              <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                Quên mật khẩu ?
              </Link>
            </div>
            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Đăng Nhập
            </button>
          </form>
          <p className='my-5'>Chưa có tài khoản ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Đăng Ký</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login;
