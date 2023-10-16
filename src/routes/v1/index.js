const express = require('express');
const router = express.Router();

const { 
    validateUserAuth, 
    validateIsAdminRequest 
} = require('../../middlewares/auth-requerst-validators');

const { 
    signUp, 
    signIn, 
    deleteUser,
    updateUser, 
    isAuthenticated, 
    isAdmin 
}  = require('../../controllers/auth-controller');

router.post('/signup', validateUserAuth, signUp);
router.post('/login', validateUserAuth, signIn);
router.delete('/user/delete/:id', deleteUser);
router.patch('/user/update/:id', updateUser);
router.get('/isAuthenticated', isAuthenticated);
router.get('/isAdmin', validateIsAdminRequest, isAdmin);

const { 
    createProduct ,
    getProduct,
    getAllProducts,
    deleteProduct,
    updateProduct
} = require('../../controllers/product-controller');

router.post('/product', createProduct);
router.get('/product/:id', getProduct);
router.get('/product', getAllProducts);
router.delete('/product/:id', deleteProduct);
router.patch('/product/:id', updateProduct);

const {
    placeOrder,
    getOrderDetails,
    cancelOrder,
} = require('../../controllers/order-controller');

router.post('/order/place', placeOrder);
router.get('/order/:id', getOrderDetails);
router.get('/order/cancel/:id', cancelOrder);

const {
    manageCart
} = require('../../controllers/cart-controller');

router.post('/cart', manageCart)

const {
    createReview,
    deleteReview,
    getReviewsByRating
} = require('../../controllers/review-controller');

router.post('/product/review', createReview);
router.delete('/product/review/:id', deleteReview);
router.get('/products/review/:rating', getReviewsByRating);

module.exports = router;