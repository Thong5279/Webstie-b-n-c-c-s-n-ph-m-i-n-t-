const stripe = require('../../config/stripe')
const orderModel = require('../../models/orderProductModel')

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
                
                //console.log('session', session)

                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                
                // Tính tổng tiền VND từ metadata của từng sản phẩm
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
                    paymentDetails: {
                        paymentId: session.payment_intent,
                        payment_method_type: session.payment_method_types,
                        payment_status: session.payment_status,
                        amountUSD: session.amount_total / 100,
                        amountVND: totalAmountVND
                    },
                    totalAmount: totalAmountVND
                };

                // Lưu đơn hàng
                const order = new orderModel(orderDetails);
                const savedOrder = await order.save();
                
                if(savedOrder?._id) {
                    await addToCartModel.deleteMany({userId: session.metadata.userId});
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
