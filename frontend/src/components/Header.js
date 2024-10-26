import React, {useContext, useState} from 'react'; 
import Logo from './Logo';
import { ImSearch } from "react-icons/im";
import { FaCircleUser, FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role'
import { toast } from 'react-toastify';
import Context from '../context';


const Header = () => {
    // Sử dụng hook useSelector để truy xuất dữ liệu người dùng từ Redux store
  // state?.user?.user: Truy cập vào state, có sử dụng optional chaining (?.) để tránh lỗi nếu state hoặc user không tồn tại
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const [search,setSearch] = useState(searchInput?.search?.split('=')[1])
  const [suggestions, setSuggestions] = useState([])

  console.log("searchInput", searchInput);
  

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

  const handleSearch = async (e) => {
    const { value } = e.target;
    setSearch(value);
    
    if (value) {
        // Gọi API gợi ý tìm kiếm
        const response = await fetch(`${SummaryApi.suggestProduct.url}?q=${value}`);
        const data = await response.json();
        setSuggestions(data.data); // Lưu gợi ý vào state
        navigate(`/search?q=${value}`);
    } else {
        setSuggestions([]); // Xóa gợi ý khi không có từ khóa
        navigate('/search');
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.productName); // Ghi lại tên sản phẩm vào ô tìm kiếm
    setSuggestions([]); // Ẩn gợi ý
    navigate(`/search?q=${suggestion.productName}`); // Điều hướng đến trang tìm kiếm
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 relative'>
          <input
            type='text'
            placeholder='Tìm kiếm sản phẩm .....'
            className='w-full outline-none'
            onChange={handleSearch}
            value={search}
          />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <ImSearch />
          </div>


          {/* gợi ý tìm kiếm */}
          <div className=' top-full block w-full absolute mt-4'>
            {suggestions.length > 0 && (
              <div className='absolute bg-white w-80 shadow-lg rounded'>
                {suggestions.map((suggestion) => (
                  <div 
                    key={suggestion._id} 
                    className='p-2 hover:bg-gray-200 cursor-pointer'
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.productName}
                  </div>
                ))}
              </div>
            )}
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
                          <Link to={"/admin-panel/all-product"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Trang Quản lý</Link>
                        )
                      }
                     
                    </nav>
                  </div>
                )
              }

            
              
           </div>
           {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
              <span><FaCartShopping /></span>
              
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
             </Link>
            )
           }
         
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
