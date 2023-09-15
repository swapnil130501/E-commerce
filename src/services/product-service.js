const { ProductRepository } = require('../repository/index');
const UserService = require('./user-service');

class ProductService{
    constructor(){
       this.productRepository = new ProductRepository();
       this.userService = new UserService();
    }

    async createProduct(data, userId){
        try {
            const isAdmin = await this.userService.isAdmin(userId);
            if (!isAdmin) {
                throw new Error('Only admins can create products');
            }
            const response = await this.productRepository.create(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProduct(productId){
        try {
            const product = this.productRepository.get(productId);
            return product;
        } catch (error) {
            console.log(error);
            throw error;            
        }
    }

    async getAllProducts(offset, limit){
        try {
            const products = this.productRepository.getAll(offset, limit);
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteProduct(productId, userId){
        try {
            const isAdmin = await this.userService.isAdmin(userId);
            if (!isAdmin) {
                throw new Error('Only admins can delete products');
            }
            await this.productRepository.destroy(productId);
            return true;
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }

    async updateProduct(productId, data, userId){
        try {
            const isAdmin = await this.userService.isAdmin(userId);
            if (!isAdmin) {
                throw new Error('Only admins can update products');
            }
            console.log(data);
            const response = await this.productRepository.update(productId, data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProductService;