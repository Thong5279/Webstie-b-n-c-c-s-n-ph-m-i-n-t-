const orderModel = require('../../models/orderProductModel');
const addToCartModel = require('../../models/cartProduct');
const productModel = require('../../models/productModel');
const userModel = require('../../models/userModel');

// Hàm cập nhật số lượng sản phẩm
const updateProductQuantity = async (productDetails) => {
  try {
    for (const item of productDetails) {
      await productModel.findByIdAndUpdate(
        item.productId,
        { $inc: { quantity: -item.quantity } }
      );
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
    throw error;
  }
};

const saveCodOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, paymentMethod, shippingInfo } = req.body;
    const userId = req.userId;

    // Validate shippingInfo
    if (!shippingInfo || !shippingInfo.address || !shippingInfo.phone || !shippingInfo.name) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp đầy đủ thông tin giao hàng"
      });
    }

    // Lấy thông tin user
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      throw new Error("Không tìm thấy thông tin người dùng");
    }

    // Tạo đơn hàng mới
    const orderDetails = {
      productDetails: cartItems,
      email: user.email,
      userId,
      shippingInfo,
      paymentDetails: {
        paymentId: `COD_${Date.now()}`,
        payment_method_type: ["COD"],
        payment_status: "paid",
        amountVND: totalAmount
      },
      totalAmount
    };

    const order = new orderModel(orderDetails);
    const savedOrder = await order.save();

    if (savedOrder._id) {
      await updateProductQuantity(cartItems);
      await addToCartModel.deleteMany({userId});

      res.json({
        success: true,
        message: "Đặt hàng thành công",
        orderId: savedOrder._id
      });
    } else {
      throw new Error("Không thể lưu đơn hàng");
    }

  } catch (error) {
    console.error("Lỗi khi lưu đơn hàng COD:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Đã xảy ra lỗi khi đặt hàng"
    });
  }
};

module.exports = saveCodOrder;
