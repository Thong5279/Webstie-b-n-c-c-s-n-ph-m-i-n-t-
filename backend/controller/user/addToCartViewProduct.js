const addToCartModel = require("../../models/cartProduct")

// Hàm lấy tất cả sản phẩm trong giỏ hàng của người dùng
const addToCartViewProduct = async(req,res) =>{
    try {
        const currentUser = req.userId // Lấy ID người dùng từ request

        // Tìm tất cả sản phẩm trong giỏ hàng của người dùng
        const allProduct = await addToCartModel.find({
            userId: currentUser
        }).populate("productId")

        // Trả về kết quả
        res.json({
            data: allProduct,
            success: true,
            error: false
        })
                
    } catch (err) {
        // Xử lý lỗi
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }   
}

module.exports = addToCartViewProduct