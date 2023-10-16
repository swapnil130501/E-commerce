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

const deleteReview = async (req, res) => {
    try {
        const response = await reviewService.deleteReview(req.params.id);
        return res.status(200).json({
            data: response,
            message: "Successfully deleted the review",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot delete the review",
            err: error,
            success: false
        });
    }
}

const getReviewsByRating = async (req, res) => {
    try {
        const response = await reviewService.getReviewsByRating(req.params.rating);
        return res.status(200).json({
            data: response,
            message: "Successfully fetched the reviews",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot fetch the reviews",
            err: error,
            success: false
        });
    }
}

module.exports = {
    createReview,
    deleteReview,
    getReviewsByRating
}