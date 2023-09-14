const Order = require('../models/order');
const CrudRepository = require('./crud-repository');

class OrderRepository extends CrudRepository{
    constructor(){
        super(Order);
    }
}

module.exports = OrderRepository;