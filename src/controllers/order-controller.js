const OrderService = require('../services/order-service');

const orderService = new OrderService();

const placeOrder = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await orderService.createOrder(req.body.userId, req.body.productId, req.body.deliveryType, token);
        return res.status(200).json({
            data: response,
            message: "Successfully placed the order",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Some problem occurred in placing the order",
            err: error,
            success: false
        });
    }
}

module.exports = {
    placeOrder
}