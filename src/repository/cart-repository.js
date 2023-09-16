const CrudRepository = require('./crud-repository');
const Cart = require('../models/cart');

class CartRepository extends CrudRepository{
    constructor(){
       super(Cart); 
    }
}

module.exports = CartRepository;