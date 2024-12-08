const stripe = require('../../config/stripe')
const orderModel = require('../../models/orderProductModel')
const productModel = require("../../models/productModel");
const { sendThankYouEmail } = require('../../helpers/sendEmail');

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET_KEY

async function getLineItems(lineItems) {
    let ProductItems = []
    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            const productData = {
                productId : productId,
                name : product.name,
                price : item.price.unit_amount / 100,
                quantity : item.quantity,
                image : product.images
            }
            //console.log("image",product)
            ProductItems.push(productData)
        }
    }
    return ProductItems
}

const updateProductQuantity = async (productDetails) => {
  try {
    for (const item of productDetails) {
      // Tìm sản phẩm theo ID và cập nhật số lượng
      await productModel.findOneAndUpdate(
        { _id: item.productId },
        { $inc: { quantity: -item.quantity } } // Giảm số lượng theo số lượng đã mua
      );
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
    throw error;
  }
};

const webhooks = async (request, response) => {
    try {
        const sig = request.headers['stripe-signature']
        
        const payloadString = JSON.stringify(request.body)

        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret: endpointSecret
        });
        
        let event;

        try {
            event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret)
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`)
            return;
        }
        // TODO: Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                
                let totalAmountVND = 0;
                const productDetails = await Promise.all(
                    lineItems.data.map(async (item) => {
                        const product = await stripe.products.retrieve(item.price.product);
                        const priceInVND = parseInt(product.metadata.priceInVND);
                        totalAmountVND += priceInVND * item.quantity;
                        return {
                            productId: product.metadata.productId,
                            name: product.name,
                            price: priceInVND,
                            quantity: item.quantity,
                            image: product.images || []
                        };
                    })
                );

                const orderDetails = {
                    productDetails: productDetails,
                    email: session.customer_email,
                    userId: session.metadata.userId,
                    shippingInfo: {
                        name: session.metadata.shippingName,
                        phone: session.metadata.shippingPhone, 
                        address: session.metadata.shippingAddress
                    },
                    paymentDetails: {
                        paymentId: session.payment_intent,
                        payment_method_type: session.payment_method_types,
                        payment_status: session.payment_status,
                        amountUSD: session.amount_total / 100,
                        amountVND: totalAmountVND
                    },
                    totalAmount: totalAmountVND
                };

                // Thêm log để debug
                console.log("Đang xóa giỏ hàng cho userId:", session.metadata.userId);

                // Lưu đơn hàng
                const order = new orderModel(orderDetails);
                const savedOrder = await order.save();
                
                if(savedOrder?._id) {
                    // Cập nhật số lượng sản phẩm
                    await updateProductQuantity(productDetails);
                    // Xóa giỏ hàng
                    await addToCartModel.deleteMany({userId: session.metadata.userId});
                    
                    // Gửi email cảm ơn
                    const orderTrackingUrl = `${process.env.FRONTEND_URL}/order`;
                    const orderDate = new Date().toLocaleDateString('vi-VN');

                    // Đảm bảo productDetails có đầy đủ thông tin
                    const formattedProductDetails = productDetails.map(product => ({
                        name: product.name,
                        quantity: product.quantity,
                        price: product.price // Giá của từng sản phẩm
                    }));

                    await sendThankYouEmail(
                        session.shipping.name, 
                        session.customer_email, 
                        orderTrackingUrl, 
                        savedOrder._id, 
                        orderDate, 
                        totalAmountVND, // Tổng tiền đơn hàng
                        formattedProductDetails
                    );
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        response.status(200).send();
    } catch (error) {
        response.status(500).json({
            message: error?.message || error
        });
    }
};
module.exports = webhooks
