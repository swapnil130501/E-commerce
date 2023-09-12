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
    getProduct
} = require('../../controllers/product-controller');

router.post('/product', createProduct);
router.get('/product/:id', getProduct);

module.exports = router;