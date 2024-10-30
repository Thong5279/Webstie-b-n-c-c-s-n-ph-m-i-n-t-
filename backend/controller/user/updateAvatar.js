const userModel = require('../../models/userModel');

async function updateAvatar(req, res) {
    try {
        const userId = req.userId;
        const { profilePic } = req.body;

        if (!profilePic) {
            throw new Error("Vui lòng chọn ảnh");
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { profilePic },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error("Không tìm thấy người dùng");
        }

        res.json({
            success: true,
            data: updatedUser,
            message: "Cập nhật ảnh đại diện thành công"
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = updateAvatar; 