const { ProductRepository } = require('.././repository/index');

class ProductService{
    constructor(){
       this.productService = new ProductRepository();
    }

    async createProduct(user, data) {
        try {
            if(user.role!='admin'){
                console.log('only a admin can list a product');
            }  
            console.log(data);
            const product = await this.productService.create(data);
            console.log(product);
            return product;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw error;
        }
    }
}

module.exports = ProductService;