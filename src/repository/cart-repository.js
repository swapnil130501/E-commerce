const CrudRepository = require('./crud-repository');
const Cart = require('../models/cart');

class CartRepository extends CrudRepository{
    constructor(){
       super(Cart); 
    }

    async getByUserId(userId){
        try {
            const response = await Cart.findOne({
                "userId": userId
            }).populate('items');
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = CartRepository;