const { OrderRepository } = require('../repository/index');
const UserService = require('./user-service');
const ProductService = require('./product-service');

class OrderService {
    constructor(){
        this.orderRepository = new OrderRepository();
        this.userService = new UserService();
        this.productService = new ProductService();
    }

    async createOrder(userId, productId, deliveryType, token) {
        try {
            await this.userService.isAuthenticated(token);
            // Fetch the product details
            const product = await this.productService.getProduct(productId);
        
            if (!product) {
                throw new Error('Product not found');
            }
            // Check product availability
            if (product.quantity <= 0) {
                throw new Error('Product is out of stock');
            }
            // Create a new order directly in the database, with valid userId and productId references
            const createdOrder = await this.orderRepository.create({
                userId: userId,
                productId: productId,
                deliveryType: deliveryType,
                status: 'Placed'
            });
            // Update product availability
            product.quantity -= 1;
        
            if (product.quantity === 0) {
                product.inStock = false;
            }
            await product.save();
            return createdOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    async getOrderDetails(orderId, token){
        try {
            await this.userService.isAuthenticated(token);
            const order = await this.orderRepository.get(orderId);
            console.log(order);
            return order;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async cancelOrder(orderId, token) {
        try {
            await this.userService.isAuthenticated(token);
            const order = await this.orderRepository.get(orderId);
            if (!order) {
                throw new Error('Order not found');
            }
            if (order.status === 'Cancelled') {
                throw new Error('Order is already cancelled');
            }
            order.status = 'Cancelled';
            const updatedOrder = await order.save();
            return updatedOrder;
        } catch (error) {
            console.log('Error in cancelling order');
            throw error;
        }
    }
}

module.exports = OrderService