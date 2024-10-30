const Contact = require('../../models/contactModel');

async function updateContactStatus(req, res) {
    try {
        const { contactId, status } = req.body;

        if (!contactId || !status) {
            throw new Error("Thiếu thông tin cần thiết");
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            contactId,
            { status },
            { new: true }
        );

        if (!updatedContact) {
            throw new Error("Không tìm thấy liên hệ");
        }

        res.json({
            success: true,
            data: updatedContact,
            message: "Cập nhật trạng thái thành công"
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = updateContactStatus;
