const mongoose = require('mongoose')

const orderProductSchema = new mongoose.Schema({
    productDetails: {
        type: Array,
        default: []
    },
    email: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        default: ""
    },
    shippingInfo: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String, 
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    paymentDetails: {
        paymentId: {
            type: String,
            default: ""
        },
        payment_method_type: [],
        payment_status: {
            type: String,
            default: ""
        },
        amountVND: {
            type: Number,
            default: 0
        }
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    totalAmount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const orderModel = mongoose.model('order', orderProductSchema)

module.exports = orderModel
