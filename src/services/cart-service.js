const { CartRepository, ProductRepository } = require('../repository/index');

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
        this.productRepository = new ProductRepository();
    }

    async manageCart(userId, productId, quantity) {
        try {
            const cart = await this.cartRepository.getByUserId(userId);
            const product = await this.productRepository.get(productId);

            if (!product || product.quantity < quantity) {
                throw new Error('Product not available in sufficient quantity');
            }
            product.quantity -= quantity;
            product.inStock = false;
            await product.save();

            if (!cart) {
                // Create a new cart if it doesn't exist for the user
                const newCart = await this.cartRepository.create({
                    userId,
                    items: [{ productId, quantity }],
                    totalAmount: quantity * product.price,
                });

                return newCart;
            }

            const productIndex = cart.items.findIndex((item) => item.productId === productId);

            if (productIndex > -1) {
                // Product is already in the cart, update quantity
                const cartProduct = cart.items[productIndex];
                cartProduct.quantity += quantity;
                cart.items[productIndex] = cartProduct;
            } else {
                // Product is not in the cart, add it
                cart.items.push({ productId, quantity });
            }

            // Calculate the total amount based on the updated cart items
            cart.totalAmount = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * product.price;
            }, 0);

            await cart.save();
            return cart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = CartService;