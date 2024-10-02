const userModel = require("../../models/userModel")            // Import mô hình người dùng từ tệp userModel

async function updateUser(req,res){                         // Hàm async để cập nhật thông tin người dùng
        try {       
                const sessionUser = req.userId                // Lấy ID người dùng hiện tại từ phiên (session)
                
                const {userId, email, name , role} = req.body       // Lấy các giá trị userId, email, name và role từ yêu cầu body

                                                // Tạo payload để cập nhật thông tin người dùng
                                                // Chỉ thêm các thuộc tính vào payload nếu chúng có giá trị
                const payload ={
                    ...(email && {email : email}),
                    ...(name && {name : name}),
                    ...(role && {role : role}),
                }

                const user = await userModel.findById(sessionUser)          // Tìm người dùng hiện tại trong cơ sở dữ liệu

                console.log("user.role",user.role)              // Ghi ra console vai trò (role) của người dùng hiện tại

                const updateUser = await userModel.findByIdAndUpdate(userId,payload)          // Tìm người dùng theo userId và cập nhật với payload mới
                // Trả về phản hồi JSON với thông tin cập nhật và thông báo thành công
                res.json({
                    data : updateUser,
                    message : "Đã cấp quyền thành công",
                    success : true,
                    error : false
                })

        } catch (err) {
            res.status(400).json({
                message: err.message || err,
                err: true,
                success: false
            })
        }
}


module.exports = updateUser

