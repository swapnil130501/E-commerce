const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deliveryType: {
        type: String,
        enum: ['1-Day', '2-Day', 'Normal'],
        required: true,
        default: 'Normal'
    },
    status: {
        type: String,
        enum: ['Placed', 'Pending', 'Cancelled', 'Delivered']
    },
    razorpayOrderId: {
        type: String
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;