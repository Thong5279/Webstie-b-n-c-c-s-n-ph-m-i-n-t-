const orderModel = require('../models/orderProductModel');
const addToCartModel = require('../models/cartProduct');
const { sendThankYouEmail } = require('../helpers/sendEmail');
const { updateProductQuantity } = require('../helpers/productHelper');

const saveOrder = async (orderDetails) => {
  try {
    const order = new orderModel(orderDetails);
    const savedOrder = await order.save();
    
    if (savedOrder._id) {
      // Cập nhật số lượng sản phẩm
      await updateProductQuantity(orderDetails.productDetails);
      // Xóa giỏ hàng
      await addToCartModel.deleteMany({userId: orderDetails.userId});
      
      // Gửi email xác nhận
      const orderTrackingUrl = `${process.env.FRONTEND_URL}/order`;
      await sendThankYouEmail(
        orderDetails.shippingInfo?.name || '',
        orderDetails.email,
        orderTrackingUrl,
        savedOrder._id,
        new Date().toLocaleDateString('vi-VN'),
        orderDetails.totalAmount,
        orderDetails.productDetails
      );
      
      return savedOrder;
    }
    throw new Error("Không thể lưu đơn hàng");
  } catch (error) {
    throw error;
  }
};

const updateProductQuantity = async (productDetails) => {
  try {
    for (const item of productDetails) {
      await productModel.findOneAndUpdate(
        { _id: item.productId },
        { $inc: { quantity: -item.quantity } }
      );
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { saveOrder }; 