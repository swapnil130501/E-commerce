const { ProductRepository } = require('../repository/index');

class ProductService{
    constructor(){
       this.productRepository = new ProductRepository();
    }

    async createProduct(data){
        try {
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

    async deleteProduct(productId){
        try {
            await this.productRepository.destroy(productId);
            return true;
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }

    async updateProduct(productId, data){
        try {
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