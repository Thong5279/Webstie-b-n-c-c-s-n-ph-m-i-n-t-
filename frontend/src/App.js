import logo from './logo.svg';
import './App.css';
import { Outlet,useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { UseDispatch, useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import AllContact from './pages/AllContact';
import Contact from './pages/Contact';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async() => {
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  
  }

  const fetchUserAddToCart  = async() => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()

   setCartProductCount(dataApi?.data?.count)
  }
  useEffect(()=>{
    // User Datail
    fetchUserDetails()
    // User Add To Cart
    fetchUserAddToCart()
  },[])
  // Xoa cac trang co footer khong can thiet
  const location = useLocation()
  const hideFooterPath = ['/login', '/contact', '/profile', '/cart','/admin-panel/all-product','/product-category','/admin-panel/all-user','/admin-panel/low-stock-products','/admin-panel/all-contact']
  return (
    <>
   <Context.Provider value={{
    fetchUserDetails, //userDetail fetch
    cartProductCount, //userAddToCartCount
    fetchUserAddToCart //userAddToCartCountFetch

    
   }}>
    <ToastContainer  
    position='top-center'
    />
   
      <Header/>
     <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet/>
      </main>
      {!hideFooterPath.includes(location.pathname) && <Footer />}
   </Context.Provider>
   </>
  );
}

export default App;
