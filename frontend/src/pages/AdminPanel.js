import React from 'react'
import { useSelector } from 'react-redux'
import { FaCircleUser, FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';
const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    
  return (
    <div className='min-h-[calc(100vh-120px)] flex'>
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-32 flex justify-center items-center flex-col '>
                <div className='text-5xl cursor-pointer relative flex justify-center'>
                    {
                        user?.profilePic ?(
                        <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name}/>//them hinh anh 
                        ) : (
                            
                        <FaRegCircleUser/>
                    ) 
                    }
                
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>  {/* chữ cái đầu viết hoacapitalize text-lg} */}
                <p className='text-sm'>{user?.role}</p>{/* Hiện vai trò của người dùng} */}
            </div>
            {/*Điều hướng  */}
            <div>
                    <nav className='grid'>
                        <Link to={"all-user"} className='px-2 py-1 hover:bg-slate-100'>Người dùng trên hệ thống</Link>
                        <Link to={"all-product"} className='px-2 py-1 hover:bg-slate-100'>Sản phẩm Trên hệ thống</Link>
                    </nav>
            </div>

        </aside>

        <main>
           <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel