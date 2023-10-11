const { ReviewRepository } = require('../repository/index');

class ReviewService{
    constructor(){
        this.reviewRepository = new ReviewRepository();
    }

    async createReview(userId, productId, rating, text){
        try {
            const response = await this.reviewRepository.create({
                userId: userId,
                productId: productId,
                rating,
                text
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ReviewService;