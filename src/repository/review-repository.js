const Review = require('../models/review');
const CrudRepository = require('./crud-repository');

class ReviewRepository extends CrudRepository{
    constructor(){
        super(Review);
    }

    async findBy(data) {
        try {
            const response = await Review.findOne(data);
            return response;
        } catch(error) {
            console.log('Something went wrong in repository:', error);
            throw error;
        }
    }
}

module.exports = ReviewRepository;