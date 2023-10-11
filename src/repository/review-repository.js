const Review = require('../models/review');
const CrudRepository = require('./crud-repository');

class ReviewRepository extends CrudRepository{
    constructor(){
        super(Review);
    }
}

module.exports = ReviewRepository;