const userModel = require("../../models/userModel")                        // Import mô hình người dùng từ tệp userModel
const router = require("../../routes")                             // Import router từ tệp routes

async function allUsers(req,res){                                        // Hàm async để lấy tất cả người dùng
    try {   
        console.log("userid all User",req.userId)                       // Ghi ra console ID của người dùng từ yêu cầu

        const allUser = await userModel.find()                      // Tìm tất cả người dùng trong cơ sở dữ liệu
        res.json({                                                   // Trả về kết quả dưới dạng JSON với thông báo thành công
            message : "All User ",
            data : allUser,                                                  // Dữ liệu tất cả người dùng
            success : true,                                                   // Trạng thái thành công
            console : false

        })
    } catch (err) {                                         // Bắt lỗi và trả về phản hồi với trạng thái lỗi
        res.status(400).json({
            message: err.message || err,                                // Thông báo lỗi
            err: true,                                                               // Biến đánh dấu lỗi
            success: false
        })
    }
}

module.exports = allUsers                       // Xuất hàm allUsers để sử dụng ở nơi khác