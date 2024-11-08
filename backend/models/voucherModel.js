const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: {
    type: String,
    enum: ["percentage", "amount", "shipping"],
    required: true,
  }, // loại giảm giá
  discountValue: { type: Number, required: true }, // giá trị giảm (phần trăm hoặc giá trị cụ thể)
  minPurchase: { type: Number, default: 0 }, // giá trị tối thiểu để áp dụng voucher
  expirationDate: { type: Date, required: true }, // ngày hết hạn
  isFreeShipping: { type: Boolean, default: false }, //Bằng true là miễn phí ship
});

module.exports = mongoose.model("Voucher", voucherSchema);
