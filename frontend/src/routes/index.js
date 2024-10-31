import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from "../pages/Home"
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUser from '../pages/AllUser'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import LowStockProducts from '../pages/LowStockProducts'
import AllContact from '../pages/AllContact'
import Contact from '../pages/Contact'
import Profile from '../pages/Profile'
import ResetPassword from '../pages/ResetPassword'
const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children  : [
            {
                path : "",
                element : <Home/>
            },
            //login
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path: 'reset-password',
                element: <ResetPassword />
            },
            {
                path : "Sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path : "cart",
                element : <Cart/>
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "contact",
                element: <Contact/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path: "all-user",
                        element : <AllUser/>
                    },
                    {
                        path: "all-product",
                        element : <AllProducts/>
                    },
                    {
                        path: "low-stock-products",
                        element: <LowStockProducts/>
                    },
                    {
                        path: "all-contact",
                        element: <AllContact/>
                    }
                ]
            },
            
        
           
        ]
    }
])
export default router
