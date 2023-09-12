const express = require('express');
const { signUp, signIn, deleteUser, isAuthenticated, isAdmin }  = require('../../controllers/auth-controller');
const { create } = require('../../controllers/product-controller');
const { validateUserAuth, validateIsAdminRequest } = require('../../middlewares/auth-requerst-validators');
const router = express.Router();

router.post('/signup', validateUserAuth, signUp);
router.post('/login', validateUserAuth, signIn);
router.delete('/user/delete/:id', deleteUser);
router.get('/isAuthenticated', isAuthenticated);
router.get('/isAdmin', validateIsAdminRequest, isAdmin);
router.post('/products', create);

module.exports = router;