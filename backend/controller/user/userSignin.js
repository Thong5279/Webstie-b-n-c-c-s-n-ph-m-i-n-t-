const bcrypt = require('bcrypt')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken');
async function userSignInController(req, res){
    try{
        const {email, password} = req.body
        if (!email) {
            throw new Error("Vui lòng cung cấp email") // Kiểm tra xem email có được cung cấp không
        }
        if (!password) {
            throw new Error("Vui lòng cung cấp mật khẩu") // Kiểm tra xem mật khẩu có được cung cấp không
        }

        const user = await userModel.findOne({ email })
        if(!user){
            throw new Error("Nguoi dung khong ton tai")
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        console.log('checkPassword', checkPassword);
        
        if(checkPassword){
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
           const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
           const tokenOption = {
            httpOnly: true,
            secure: true
           }
           res.cookie("token", token, tokenOption).status(200).json({
            message: "Dang nhap thanh cong",
            data: token,
            success: true,
            error: false
           })
        }else{
            throw new Error("Vui long kiem tra lai mat khau")
        }
        
    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}
module.exports = userSignInController