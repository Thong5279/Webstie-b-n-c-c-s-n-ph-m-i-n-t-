const stripe = require("../../config/stripe");
const VNDtoUSD = require("../../helpers/currencyConverter");
const userModel = require("../../models/userModel");


const paymentController = async (request, response) => {
  try {
    const { cartItems, totalAmount } = request.body;
    const user = await userModel.findOne({ _id: request.userId });

    const totalAmountUSD = VNDtoUSD(totalAmount);

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: user.email,
      metadata: {
        userId: request.userId,
        originalCurrency: "VND",
        totalAmountVND: totalAmount
      },
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage,
              metadata: {
                productId: item.productId._id,
                priceInVND: totalAmount
              },
            },
            unit_amount: Math.round(totalAmountUSD * 100),
          },
          quantity: 1,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    response.status(200).json(session);
  } catch (error) {
    response.status(500).json({
      message: error?.message || error,
    });
  }
};

module.exports = paymentController;

