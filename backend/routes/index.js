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
} = require("../controller/admin/adminFavoritesController");
const getAllOrders = require("../controller/order/getAllOrders");

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

module.exports = router;
