const userModel = require("../models/userModel") // Import model người dùng từ thư mục models
const bcrypt = require('bcrypt'); // Import thư viện bcrypt để mã hóa mật khẩu

// Hàm controller để xử lý việc đăng ký người dùng
async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body // Lấy dữ liệu email, password, name từ yêu cầu (request)

        // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
        const user = await userModel.findOne({ email })
        console.log("user", user)

        if (user) {
            throw new Error("Người dùng đã tồn tại.") // Nếu người dùng đã tồn tại, ném ra lỗi
        }
        if (!email) {
            throw new Error("Vui lòng cung cấp email") // Kiểm tra xem email có được cung cấp không
        }
        if (!password) {
            throw new Error("Vui lòng cung cấp mật khẩu") // Kiểm tra xem mật khẩu có được cung cấp không
        }
        if (!name) {
            throw new Error("Vui lòng cung cấp tên tài khoản") // Kiểm tra xem tên tài khoản có được cung cấp không
        }

        const salt = bcrypt.genSaltSync(10); // Tạo salt cho việc mã hóa mật khẩu
        const hashPassword = await bcrypt.hashSync(password, salt); // Mã hóa mật khẩu

        if (!hashPassword) {
            throw new Error("Có cái gì đó sai sai!") // Nếu việc mã hóa thất bại, ném ra lỗi
        }

        const payload = {
            ...req.body,
            role: "Khách hàng",
            password: hashPassword // Tạo đối tượng payload với mật khẩu đã mã hóa
        }

        const userData = new userModel(payload) // Tạo đối tượng người dùng mới từ model với dữ liệu payload
        const saveUser = await userData.save() // Lưu người dùng mới vào cơ sở dữ liệu

        // Trả về phản hồi thành công với dữ liệu người dùng đã lưu
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "Đăng ký tài khoản thành công"
        })

    } catch (err) {
        console.log("err")
        // Trả về phản hồi lỗi nếu có lỗi xảy ra
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController // Xuất hàm controller để sử dụng ở các nơi khác
