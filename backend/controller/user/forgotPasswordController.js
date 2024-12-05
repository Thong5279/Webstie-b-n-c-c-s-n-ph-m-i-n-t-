const userModel = require("../../models/userModel");
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Lưu trữ mã xác nhận tạm thời (trong thực tế nên dùng Redis)
const verificationCodes = new Map();

async function forgotPasswordController(req, res) {
  try {
    const { phone } = req.body;
    
    // Tìm user với số điện thoại
    const user = await userModel.findOne({ phone });
    if (!user) {
      throw new Error("Số điện thoại không tồn tại trong hệ thống");
    }

    // Tạo mã xác nhận 6 số
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Lưu mã xác nhận và thời gian hết hạn (5 phút)
    verificationCodes.set(phone, {
      code: verificationCode,
      expiry: Date.now() + 5 * 60 * 1000,
      email: user.email
    });

    console.log('Stored verification code:', {
      phone,
      code: verificationCode,
      expiry: new Date(Date.now() + 5 * 60 * 1000).toISOString()
    });

    // Che giấu email
    const maskedEmail = user.email.replace(/(.{2})(.*)(@.*)/, "$1***$3");

    // Gửi email với mã xác nhận
    const msg = {
      to: user.email,
      from: process.env.FROM_EMAIL,
      templateId: process.env.TEMPLATE_ID_ForgotPassword,
      dynamic_template_data: {
        verificationCode: verificationCode
      }
    };

    await sgMail.send(msg);

    res.json({
      success: true,
      message: "Mã xác nhận đã được gửi",
      maskedEmail
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  forgotPasswordController,
  verificationCodes
}; 