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

    async deleteReview(reviewId) {
        try {
            const existingReview = await this.reviewRepository.get(reviewId);
            if (!existingReview) {
                return false;
            }
            await this.reviewRepository.destroy(reviewId);
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getReviewsByRating(rating) {
        try {
            const reviews = await this.reviewRepository.findBy({ rating });
            console.log(reviews);
            return reviews;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ReviewService;