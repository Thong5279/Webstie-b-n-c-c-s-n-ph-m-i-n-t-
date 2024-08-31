import React, {useState} from 'react'; 
import Logo from './Logo';
import { ImSearch } from "react-icons/im";
import { FaCircleUser, FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role'
import { toast } from 'react-toastify';


const Header = () => {
    // Sử dụng hook useSelector để truy xuất dữ liệu người dùng từ Redux store
  // state?.user?.user: Truy cập vào state, có sử dụng optional chaining (?.) để tránh lỗi nếu state hoặc user không tồn tại
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)

// Định nghĩa hàm handleLogout để xử lý việc đăng xuất
  const handleLogout = async() => {
     // Gửi yêu cầu đăng xuất tới API
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,   // Sử dụng phương thức HTTP được định nghĩa trong API (ví dụ: POST)
      credentials : 'include'
    })
// Chuyển đổi phản hồi thành định dạng JSON
    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)  // Cập nhật Redux store: xóa thông tin người dùng bằng cách gửi action setUserDetails(null)
      dispatch(setUserDetails(null))
    }


    if(data.error){
      toast.error(data.message)
    }
  }
  return (
    <header className='h-16  shadow-md bg-white fixed w-full z-40'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
       
        <div className=''>
            <Link to={"/"}>
            <Logo w={90} h={50}/>
            </Link>       
        </div>

        
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
            <input type='text' placeholder='Tìm kiếm sản phẩm .....' className='w-full outline-none '/>
            <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <ImSearch />
            </div>
        </div>


        <div className='flex items-center gap-7'>

           <div className='relative flex justify-center'>

            {
              user?._id &&(
                <div className='text-3xl cursor-pointer relative flex justify-center'  onClick={()=>setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ?(
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>//them hinh anh 
                    ) : (
                          
                      <FaRegCircleUser/>
                  ) 
                  }
            
              </div>
              )
            }
            
              
              {
                menuDisplay &&(
                    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                    <nav>
                      {
                        user?.role === ROLE.ADMIN && (
                          <Link to={"/admin-panel/all-product"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                        )
                      }
                     
                    </nav>
                  </div>
                )
              }

            
              
           </div>
            <div className='text-2xl relative'>
                <span><FaCartShopping /></span>
                
                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>0</p>
                </div>
            </div>
            <div>
            {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Đăng xuất</button>
                    )
                    : (
                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Đăng nhập</Link>
                    )
                  }
                 
            </div>
        </div>
      </div>                                             
    </header>
  )
}

export default Header