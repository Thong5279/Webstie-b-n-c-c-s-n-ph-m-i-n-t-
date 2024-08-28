import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from "../pages/Home"
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUser from '../pages/AllUser'
import AllProducts from '../pages/AllProducts'
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
                path : "Sign-up",
                element : <SignUp/>
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
                    }
                ]

            },
        
           
        ]
    }
])
export default router