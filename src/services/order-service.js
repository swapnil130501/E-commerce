const { OrderRepository } = require('../repository/index');
const UserService = require('./user-service');
const ProductService = require('./product-service');

class OrderService {
    constructor(){
        this.orderRepository = new OrderRepository();
        this.userService = new UserService();
        this.productService = new ProductService();
    }

    async createOrder(userId, productId, deliveryType = 'Normal', token) {
        try {
            const user = this.userService.isAuthenticated(token);
            if(!user){
                console.log('user not authenticated');
            }
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
}

module.exports = OrderService