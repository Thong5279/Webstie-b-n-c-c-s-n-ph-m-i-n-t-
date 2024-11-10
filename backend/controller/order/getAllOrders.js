const orderModel = require('../../models/orderProductModel');

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: orders,
      message: "Lấy danh sách đơn hàng thành công"
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách đơn hàng",
      error: error.message
    });
  }
};

module.exports = getAllOrders;
