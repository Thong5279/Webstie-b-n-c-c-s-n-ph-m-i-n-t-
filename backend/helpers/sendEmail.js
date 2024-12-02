const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendThankYouEmail = async (customerName, customerEmail, orderTrackingUrl, orderId, orderDate, totalAmount, productDetails) => {
  try {
    const displayVNDCurrency = (amount) => {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const msg = {
      to: customerEmail,
      from: process.env.FROM_EMAIL,
      templateId: process.env.TEMPLATE_ID_ThankYou,
      dynamic_template_data: {
        customerName: customerName,
        orderTrackingUrl: orderTrackingUrl,
        orderId: orderId,
        orderDate: orderDate,
        totalAmount: displayVNDCurrency(totalAmount),
        products: productDetails.map(product => ({
          name: product.name,
          quantity: product.quantity,
          price: displayVNDCurrency(product.price)
        }))
      }
    };

    await sgMail.send(msg);
    console.log('Email cảm ơn đã được gửi thành công');
    return true;
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
    return false;
  }
};

module.exports = { sendThankYouEmail };