const Contact = require('../../models/contactModel');

async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find().sort({createdAt: -1});
    
    res.json({
      success: true,
      data: contacts,
      message: "Lấy danh sách liên hệ thành công"
    });
    
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = getAllContacts;
