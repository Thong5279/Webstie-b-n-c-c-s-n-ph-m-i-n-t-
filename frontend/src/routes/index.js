import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import LowStockProducts from "../pages/LowStockProducts";
import AllContact from "../pages/AllContact";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import BuyProduct from "../components/BuyProduct";
import GuiPayMent from "../components/GuiPayMent";
import Shipping from "../components/Shipping";
import ReturnPolicy from "../components/ReturnPolicy";
import Warranty from "../components/Warranty";
import Privacy from "../components/Privacy";
import Faq from "../components/Faq";
import ZaloBox from "../components/ZaloBox";
import ZaloInformation from "../components/ZaloInformation";
import VoucherManager from "../components/VoucherManager";
import Succes from "../pages/Success";
import Cancel from "../pages/Cancel";
import OderPage from "../pages/OderPage";
import AdminFavoritesPage from "../pages/AdminFavoritesPage";
import AllOrder from "../pages/AllOrder";
import Allmember from "../pages/Allmember";
import Allblog from "../pages/Allblog";
import AllReview from "../pages/AllReview";
import AllPromotion from "../pages/AllPromotion";
import FavoritesUser from "../pages/FavoritesUser";
import ChatWithCustommer from "../pages/ChatWithCustommer";
import VerifyCode from "../pages/VerifyCode";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      //login
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "Sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "favourite",
        element: <FavoritesUser />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/guide/shopping",
        element: <BuyProduct />,
      },
      {
        path: "/guide/payment",
        element: <GuiPayMent />,
      },
      {
        path: "/policy/shipping",
        element: <Shipping />,
      },
      {
        path: "/policy/return",
        element: <ReturnPolicy />,
      },
      {
        path: "/policy/warranty",
        element: <Warranty />,
      },
      {
        path: "/policy/privacy",
        element: <Privacy />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/zalo-box",
        element: <ZaloInformation />,
      },
      {
        path: "/success",
        element: <Succes />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
      {
        path: "/order",
        element: <OderPage />,
      },
      {
        path: "/verify-code",
        element: <VerifyCode />
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-user",
            element: <AllUser />,
          },
          {
            path: "all-product",
            element: <AllProducts />,
          },
          {
            path: "low-stock-products",
            element: <LowStockProducts />,
          },
          {
            path: "all-contact",
            element: <AllContact />,
          },
          {
            path: "all-voucher",
            element: <VoucherManager />,
          },
          {
            path: "all-favorites",
            element: <AdminFavoritesPage />,
          },
          {
            path: "all-order",
            element: <AllOrder />,
          },
          {
            path: "all-member",
            element: <Allmember />,
          },
          {
            path: "all-blog",
            element: <Allblog />,
          },
          {
            path: "all-review",
            element: <AllReview />,
          },
          {
            path: "all-promotion",
            element: <AllPromotion />,
          },
          {
            path: "chat",
            element: <ChatWithCustommer />,
          },
        ],
      },
    ],
  },
]);
export default router;
