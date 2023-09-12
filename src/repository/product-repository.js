const CrudRepository = require('./crud-repository');
const Product = require('../models/product.js');

class ProductRepository extends CrudRepository {
    constructor() {
        super(Product);
    }
}

module.exports = ProductRepository;