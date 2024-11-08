const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: {
    type: String,
    enum: ["percentage", "amount"],
    required: true,
  }, // loại giảm giá
  discountValue: { type: Number, required: true }, // giá trị giảm (phần trăm hoặc giá trị cụ thể)
  minPurchase: { type: Number, default: 0 }, // giá trị tối thiểu để áp dụng voucher
  expirationDate: { type: Date, required: true }, // ngày hết hạn
});

module.exports = mongoose.model("Voucher", voucherSchema);
