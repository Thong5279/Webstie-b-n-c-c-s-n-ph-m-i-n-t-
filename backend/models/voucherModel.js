const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true }, // phần trăm giảm giá, ví dụ 10, 15
    minPurchase: { type: Number, default: 0 }, // giá trị tối thiểu để áp dụng voucher
    expirationDate: { type: Date, required: true } // ngày hết hạn
});

module.exports = mongoose.model('Voucher', voucherSchema);
