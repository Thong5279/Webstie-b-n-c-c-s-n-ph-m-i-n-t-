import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyCode from "../pages/VerifyCode";

const backendDomin = process.env.REACT_APP_BACKEND_URL; //"http://localhost:8080"; // Định nghĩa URL của backend, thường là địa chỉ của server backend

const SummaryApi = {
  // Định nghĩa các API endpoints cho ứng dụng
  signUP: {
    // Endpoint để đăng ký người dùng mới
    url: `${backendDomin}/api/signup`, // Đường dẫn API cho đăng ký
    method: "post", // Phương thức HTTP sử dụng
  },
  signIn: {
    // Endpoint để đăng nhập người dùng
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    // Endpoint để lấy thông tin người dùng hiện tại
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    // Endpoint để đăng xuất người dùng
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    // Endpoint để lấy danh sách tất cả người dùng
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    // En
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-cart-product`,
    method: "get",
  },
  updateAddToCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteAddToCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },
  suggestProduct: {
    // Thêm endpoint gợi ý tìm kiếm
    url: `${backendDomin}/api/suggest`,
    method: "get",
  },
  getUserDetails: {
    url: `${backendDomin}/api/user-details`,
    method: "GET",
  },
  getAllContacts: {
    url: `${backendDomin}/api/all-contact`,
    method: "GET",
  },
  createContact: {
    url: `${backendDomin}/api/create-contact`,
    method: "POST",
  },
  updateContactStatus: {
    url: `${backendDomin}/api/update-contact-status`,
    method: "POST",
  },
  updateProfile: {
    url: `${backendDomin}/api/update-profile`,
    method: "POST",
  },
  updateAvatar: {
    url: `${backendDomin}/api/update-avatar`,
    method: "POST",
  },
  // voucher
  createVoucher: {
    url: `${backendDomin}/api/create-voucher`,
    method: "POST",
  },
  getAllVouchers: {
    url: `${backendDomin}/api/all-voucher`,
    method: "GET",
  },
  applyVoucher: {
    url: `${backendDomin}/api/apply-voucher`,
    method: "POST",
  },
  deleteVoucher: {
    url: `${backendDomin}/api/delete-voucher`,
    method: "DELETE",
  },
  updateVoucher: {
    url: `${backendDomin}/api/update-voucher`,
    method: "PUT",
  },
  payment: {
    url: `${backendDomin}/api/checkout`,
    method: "POST",
  },
  getOrder: {
    url: `${backendDomin}/api/order-list`,
    method: "GET",
  },
  favorites: {
    url: `${backendDomin}/api/add-favorites`,
    method: "POST",
  },
  getFavorites: {
    url: `${backendDomin}/api/get-favorites`,
    method: "GET",
  },
  clearFavorites: {
    url: `${backendDomin}/api/clear-favorites`,
    method: "DELETE",
  },
  // Yeu thich cho user
  userFavorites: {
    url: `${backendDomin}/api/user-favorites`,
    method: "POST",
  },
  getUserFavorites: {
    url: `${backendDomin}/api/get-user-favorites`,
    method: "GET",
  },
  getAllOrders: {
    url: `${backendDomin}/api/all-orders`,
    method: "get",
  },
  getUserTier: {
    url: `${backendDomin}/api/user-tier`,
    method: "get",
  },
  saveCodOrder: {
    url: `${backendDomin}/api/save-cod-order`,
    method: "post"
  },
  ForgotPassword: {
    url: `${backendDomin}/api/forgot-password`,
    method: "post",
  },
  VerifyCode: {
    url: `${backendDomin}/api/verify-code`,
    method: "post",
  },
  ResetPassword: {
    url: `${backendDomin}/api/reset-password`,
    method: "post",
  },
  forgotPassword: {
    url: `${backendDomin}/api/forgot-password`,
    method: "post",
  },
  verifyCode: {
    url: `${backendDomin}/api/verify-code`,
    method: "post",
  },
  resetPassword: {
    url: `${backendDomin}/api/reset-password`,
    method: "post",
  },
  review: {
    url: `${backendDomin}/api/review`,
    method: 'POST'
  },
  getReviews: {
    url: `${backendDomin}/api/reviews`,
    method: 'GET'
  }
};

console.log('API Endpoints:', SummaryApi);

export default SummaryApi; // Xuất đối tượng SummaryApi để có thể sử dụng ở các tệp khác
