const mongoose = require('mongoose')

// Định nghĩa schema cho giỏ hàng
const addToCart = mongoose.Schema({
    productId : {
        ref : "product",
        type : String,
    }, // ID sản phẩm
    quantityCart : Number,  // Số lượng sản phẩm
    userId : String     // ID người dùng
},{
    timesetamps : true  // Bật tính năng ghi lại thời gian
}
)
 
// Tạo model từ schema
const addToCartModel = mongoose.model("addToCart",addToCart)


module.exports = addToCartModel
