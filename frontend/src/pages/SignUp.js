import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../img/assest/signin.gif';
import { IoEye, IoEyeOff } from "react-icons/io5";
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

// Hàm kiểm tra mật khẩu hợp lệ
const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isValidLength = password.length >= 8;

  return hasUpperCase && hasLowerCase && hasNumber && isValidLength;
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    sex: "",
    address: "",
    phone: "",
    confirmPassword: "",
    profilePic: ""
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Vui lòng kiểm tra lại hai mật khẩu không giống nhau");
      return;
    }

    if (!validatePassword(data.password)) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số");
      return;
    }

    try {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-md'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcons} alt='login icons' />
            </div>
            <form>
              <label>
                <div className='text-xs bg-slate-200 bg-opacity-80 py-3 text-center absolute bottom-0 w-full cursor-pointer'>
                  Tải hình lên
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            {/* Tên */}
            <div className='grid'>
              <label>Tên Đăng Nhập :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='Nhập tên của bạn'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            {/* Email */}
            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Nhập email của bạn'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            {/* Địa chỉ */}
            <div className='grid'>
              <label>Địa Chỉ</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='Nhập địa chỉ của bạn'
                  name='address'
                  value={data.address}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            {/* Số điện thoại */}
            <div className='grid'>
              <label>Số Điện Thoại</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='Nhập số điện thoại của bạn'
                  name='phone'
                  value={data.phone}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            {/* Giới tính */}
            <div className='flex justify-between'>
              <label>Giới Tính:</label>
              <div className='flex justify-center items-center'>
                <div className='mr-3 flex items-center gap-1'>
                  <input
                    type='radio'
                    name='sex'
                    value="Nam"
                    onChange={handleOnChange}
                    required
                    className='w-4'
                  />Nam
                </div>
                <div className='flex items-center gap-1'>
                  <input
                    type='radio'
                    name='sex'
                    value="Nữ"
                    onChange={handleOnChange}
                    required
                    className='w-4'
                  />Nữ
                </div>
                <div className='flex items-center gap-1 ml-3'>
                  <input
                    type='radio'
                    name='sex'
                    value="Khác"
                    onChange={handleOnChange}
                    required
                    className='w-4'
                  />Khác
                </div>
              </div>
            </div>
            {/* Mật khẩu */}
            <div>
              <label>Mật Khẩu :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Nhập mật khẩu'
                  className='w-full h-full outline-none bg-transparent'
                  onChange={handleOnChange}
                  required
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
            </div>
            {/* Nhập lại mật khẩu */}
            <div>
              <label>Nhập lại mật khẩu :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Xác nhận mật khẩu'
                  className='w-full h-full outline-none bg-transparent'
                  onChange={handleOnChange}
                  required
                  name='confirmPassword'
                  value={data.confirmPassword}
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setConfirmPassword(prev => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
                  </span>
                </div>
              </div>
            </div>
            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Đăng Ký
            </button>
          </form>
          <p className='my-5'>Đã có tài khoản? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Đăng nhập</Link></p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
