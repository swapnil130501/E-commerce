const CartService = require('../services/cart-service');

const cartServive = new CartService();

const manageCart = async (req, res) => {
    try {
        const response = await cartServive.manageCart(req.body.userId, req.body.productId, req.body.quantity);
        return res.status(200).json({
            data: response,
            message: "Cart updated successfully",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Some problem occurred in updating the cart",
            err: error,
            success: false
        });
    }
}

module.exports = {
    manageCart
}