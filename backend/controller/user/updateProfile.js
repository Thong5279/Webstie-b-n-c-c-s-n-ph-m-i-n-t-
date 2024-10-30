const userModel = require('../../models/userModel');

async function updateProfile(req, res) {
    try {
        const userId = req.userId; // Lấy ID từ token
        const { name, phone, address, sex } = req.body;

        // Validate
        if (!name || !phone || !address) {
            throw new Error("Vui lòng điền đầy đủ thông tin");
        }

        // Validate phone number (VN format)
        const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
            throw new Error("Số điện thoại không hợp lệ");
        }

        // Update user
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                name,
                phone,
                address,
                sex
            },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error("Không tìm thấy người dùng");
        }

        res.json({
            success: true,
            data: updatedUser,
            message: "Cập nhật thông tin thành công"
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = updateProfile; 