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
}

module.exports = ProductService;