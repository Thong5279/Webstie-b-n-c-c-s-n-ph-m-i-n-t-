const Voucher = require("../../models/voucherModel");

// Tạo mã giảm giá mới
const createVoucher = async (req, res) => {
  const { code, discountType, discountValue, minPurchase, expirationDate } =
    req.body;
  try {
    const newVoucher = await Voucher.create({
      code,
      discountType,
      discountValue,
      minPurchase,
      expirationDate,
    });
    res
      .status(201)
      .json({ message: "Mã giảm giá đã được tạo", voucher: newVoucher });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo mã giảm giá", error });
  }
};

// Xóa mã giảm giá
const deleteVoucher = async (req, res) => {
  const { code } = req.params;
  try {
    const voucher = await Voucher.findOneAndDelete({ code });
    if (!voucher)
      return res.status(404).json({ message: "Mã giảm giá không tồn tại" });
    res.status(200).json({ message: "Mã giảm giá đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa mã giảm giá", error });
  }
};

// Sửa mã giảm giá
const updateVoucher = async (req, res) => {
  const { code } = req.params;
  const { discountType, discountValue, minPurchase, expirationDate } = req.body;
  try {
    const updatedVoucher = await Voucher.findOneAndUpdate(
      { code },
      { discountType, discountValue, minPurchase, expirationDate },
      { new: true }
    );
    if (!updatedVoucher)
      return res.status(404).json({ message: "Voucher không tìm thấy" });
    res
      .status(200)
      .json({ message: "Voucher đã được cập nhật", voucher: updatedVoucher });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật voucher", error });
  }
};

// Lấy tất cả mã giảm giá
const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json(vouchers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Không thể lấy danh sách mã giảm giá", error });
  }
};

// Áp dụng mã giảm giá khi thanh toán
const applyVoucher = async (req, res) => {
  const { code, totalAmount } = req.body;
  try {
    const voucher = await Voucher.findOne({ code });
    if (!voucher)
      return res.status(404).json({ message: "Mã giảm giá không hợp lệ" });

    const now = new Date();
    if (now > voucher.expirationDate)
      return res.status(400).json({ message: "Mã giảm giá đã hết hạn" });
    if (totalAmount < voucher.minPurchase) {
      return res.status(400).json({
        message: `Giá trị đơn hàng phải đạt tối thiểu ${voucher.minPurchase} để áp dụng mã giảm giá này`,
      });
    }

    let discountAmount;
    if (voucher.discountType === "percentage") {
      discountAmount = (totalAmount * voucher.discountValue) / 100;
    } else {
      discountAmount = voucher.discountValue;
    }

    res
      .status(200)
      .json({ message: "Mã giảm giá đã được áp dụng", discountAmount });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi áp dụng mã giảm giá", error });
  }
};

module.exports = {
  createVoucher,
  getAllVouchers,
  applyVoucher,
  deleteVoucher,
  updateVoucher,
};
