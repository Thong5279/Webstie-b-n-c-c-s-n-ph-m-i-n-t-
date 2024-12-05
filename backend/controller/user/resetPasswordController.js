const userModel = require("../../models/userModel");
const bcrypt = require('bcrypt');
const { verificationCodes } = require('./forgotPasswordController');

async function resetPasswordController(req, res) {
  try {
    const { phone, newPassword } = req.body;
    
    const storedData = verificationCodes.get(phone);
    if (!storedData) {
      throw new Error("Phiên làm việc đã hết hạn");
    }

    // Mã hóa mật khẩu mới
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(newPassword, salt);

    // Cập nhật mật khẩu trong DB
    await userModel.findOneAndUpdate(
      { phone },
      { password: hashPassword }
    );

    // Xóa mã xác nhận đã sử dụng
    verificationCodes.delete(phone);

    res.json({
      success: true,
      message: "Đặt lại mật khẩu thành công"
    });

  } catch (err) {
    res.status(400).json({
      success: false, 
      message: err.message
    });
  }
}

module.exports = resetPasswordController; 