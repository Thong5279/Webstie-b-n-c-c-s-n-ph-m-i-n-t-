const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendThankYouEmail = async (customerName, customerEmail, orderTrackingUrl) => {
  try {
    const msg = {
      to: customerEmail,
      from: process.env.FROM_EMAIL,
      templateId: process.env.TEMPLATE_ID_ThankYou,
      dynamic_template_data: {
        customerName: customerName,
        orderTrackingUrl: orderTrackingUrl
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