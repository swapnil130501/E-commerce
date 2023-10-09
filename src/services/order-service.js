const Razorpay = require('razorpay');
const { OrderRepository } = require('../repository/index');
const UserService = require('./user-service');
const ProductService = require('./product-service');
const { KEY_ID, KEY_SECRET } = require('../config/server-config');

class OrderService {
    constructor(){
        this.orderRepository = new OrderRepository();
        this.userService = new UserService();
        this.productService = new ProductService();

        this.razorpay = new Razorpay({
            key_id: KEY_ID,
            key_secret: KEY_SECRET
        });
    }

    async createOrder(userId, productId, deliveryType, token) {
        try {
          await this.userService.isAuthenticated(token);

          const product = await this.productService.getProduct(productId);
    
          if (!product) {
            throw new Error('Product not found');
          }
          // Check product availability
          if (product.quantity <= 0) {
            throw new Error('Product is out of stock');
          }
          // Create a new order directly in the database, with valid userId and productId references
          const order = await this.orderRepository.create({
            userId: userId,
            productId: productId,
            deliveryType: deliveryType,
            status: 'Placed',
          });
          // Initialize the payment amount (in paise or smallest currency unit)
          const amountInPaise = product.price * 100; // Assuming product price is in currency (e.g., INR)

          // Create a Razorpay order
          const razorpayOrder = await this.razorpay.orders.create({
            amount: amountInPaise,
            currency: 'INR', // Change to your desired currency code
            receipt: `order_${order._id}`, // A unique identifier for your order
          });
          // store the `razorpayOrder.id` in your order document for reference
          order.razorpayOrderId = razorpayOrder.id;

          await order.save();
          return {
            orderId: order._id,
            razorpayOrder: razorpayOrder,
          };
        } catch (error) {
          console.error('Error creating order:', error);
          throw error;
        }
    }

    async initiatePayment(orderId) {
        try {
          // Fetch order details from your database
          const order = await this.orderRepository.findById(orderId);
          // Create a Razorpay order object (as in your original code)
          const amountInPaise = order.product.price * 100;
          const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: 'INR', // Change to your desired currency code
            receipt: `order_${order._id}`,
            });
          return razorpayOrder;
        } catch (error) {
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