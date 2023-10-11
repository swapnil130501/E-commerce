const ReviewService = require('../services/review-service');

const reviewService = new ReviewService();

const createReview = async (req, res) => {
    try {
        const { userId, productId, rating, text } = req.body;
        const response = await reviewService.createReview(userId, productId, rating, text);
        return res.status(200).json({
            data: response,
            message: "Successfully created a Review",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot create a Review",
            err: error,
            success: false
        });
    }
}

module.exports = {
    createReview
}