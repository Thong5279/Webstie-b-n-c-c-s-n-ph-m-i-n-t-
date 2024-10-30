const Contact = require('../../models/contactModel');

async function createContact(req, res) {
    try {
        const { name, email, phone, message } = req.body;

        // Validate
        if (!name || !email || !phone || !message) {
            throw new Error("Vui lòng điền đầy đủ thông tin");
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Email không hợp lệ");
        }

        // Validate phone number (VN format)
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
            throw new Error("Số điện thoại không hợp lệ");
        }

        // Create new contact
        const newContact = new Contact({
            name,
            email,
            phone,
            message,
            status: 'Chưa xử lý'
        });

        await newContact.save();

        res.json({
            success: true,
            data: newContact,
            message: "Gửi liên hệ thành công"
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = createContact;
