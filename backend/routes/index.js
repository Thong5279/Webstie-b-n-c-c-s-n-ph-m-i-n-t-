const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignin");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middlesware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadproduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const suggestProduct = require("../controller/product/suggestProduct");
const getAllContacts = require("../controller/contact/getAllContacts");
const updateContactStatus = require("../controller/contact/updateContactStatus");
const createContact = require("../controller/contact/createContact");
const updateProfile = require("../controller/user/updateProfile");
const {
  createVoucher,
  getAllVouchers,
  applyVoucher,
  deleteVoucher,
  updateVoucher,
} = require("../controller/product/voucherController");
const paymentController = require("../controller/order/paymentController");
const webhooks = require("../controller/order/webhook");
const orderController = require("../controller/order/order.controller");
const {
  toggleFavoriteProduct,
  getFavoriteProducts,
  clearFavoriteProducts,
  getFavoriteStats,
} = require("../controller/admin/adminFavoritesController");
const getAllOrders = require("../controller/order/getAllOrders");
const { getAllUsersWithTiers } = require("../controller/admin/adminController");
const {
  toggleFavoriteUserProduct,
  getUserFavoriteProducts,
} = require("../controller/user/userFavoritesController");
const saveCodOrder = require("../controller/order/codOrderController");
const forgotPasswordController = require("../controller/user/forgotPasswordController").forgotPasswordController;
const verifyCodeController = require("../controller/user/verifyCodeController");
const resetPasswordController = require("../controller/user/resetPasswordController");
const { saveReview } = require('../controller/review/reviewController');
const getReviews = require('../controller/review/getReviews');
const getAllReviews = require("../controller/review/getAllReviews");
const deleteReview = require('../controller/review/deleteReview');

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

//admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// route de them san pham vao danh sach yeu thich
router.post("/add-favorites", toggleFavoriteProduct);
router.get("/get-favorites", getFavoriteProducts);
router.delete("/clear-favorites", clearFavoriteProducts);

// router de them yeu thich san pham cua User
router.post("/user-favorites", authToken, toggleFavoriteUserProduct);
router.get("/get-user-favorites", authToken, getUserFavoriteProducts);

//upload san pham
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// Route tạo mã giảm giá (chỉ admin sử dụng)
router.post("/create-voucher", createVoucher);

// Ham xoa voucher
router.delete("/delete-voucher/:code", deleteVoucher);

//Ham sua ma giam gia
router.put("/update-voucher/:code", updateVoucher);

// Route lấy danh sách mã giảm giá
router.get("/all-voucher", getAllVouchers);

// Route áp dụng mã giảm giá khi thanh toán
router.post("/apply-voucher", applyVoucher);

//user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

router.get("/suggest", suggestProduct);

//Lay danh sach nguoi dung voi cac thu hang
router.get("/user-tier", getAllUsersWithTiers);

router.get("/all-contact", authToken, getAllContacts); // lấy danh sách liên hệ
router.post("/update-contact-status", authToken, updateContactStatus);

// Add new route
router.post("/create-contact", createContact);

// Add route (yêu cầu đăng nhập)
router.post("/update-profile", authToken, updateProfile);

//payment
router.post("/checkout", authToken, paymentController);

//webhook
router.post("/webhook", webhooks); // api để xử lý các sự kiện từ stripe

//order
router.get("/order-list", authToken, orderController);

//all orders
router.get("/all-orders", authToken, getAllOrders);

router.post("/save-cod-order", authToken, saveCodOrder);
// forgot password
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-code", verifyCodeController);
router.post("/reset-password", resetPasswordController);

// Route đánh giá sản phẩm
router.post('/review', authToken, saveReview);

router.get('/reviews/:productId', getReviews);

router.get('/all-reviews', authToken, getAllReviews);

router.get('/api/reviews/stats', authToken, getAllReviews);

// Thêm route xóa đánh giá
router.delete('/review/:reviewId', authToken, deleteReview);

router.get("/favorite-stats", getFavoriteStats);

module.exports = router;
