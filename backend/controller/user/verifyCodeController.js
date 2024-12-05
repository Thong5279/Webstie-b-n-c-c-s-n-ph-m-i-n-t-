const forgotPasswordModule = require('./forgotPasswordController');
const verificationCodes = forgotPasswordModule.verificationCodes;

async function verifyCodeController(req, res) {
  try {
    const { phone, code } = req.body;
    console.log('Verifying code:', { phone, code });
    console.log('All stored codes:', Array.from(verificationCodes.entries()));
    
    const storedData = verificationCodes.get(phone);
    console.log('Stored data for phone:', storedData);
    
    if (!storedData) {
      throw new Error("Mã xác nhận không tồn tại hoặc đã hết hạn");
    }

    if (Date.now() > storedData.expiry) {
      verificationCodes.delete(phone);
      throw new Error("Mã xác nhận đã hết hạn");
    }

    if (storedData.code !== code) {
      throw new Error("Mã xác nhận không chính xác");
    }

    res.json({
      success: true,
      message: "Xác thực thành công"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = verifyCodeController; 