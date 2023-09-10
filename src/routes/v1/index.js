const express = require('express');
const { signUp, signIn, isAuthenticated, isAdmin }  = require('../../controllers/auth-controller');
const { validateUserAuth, validateIsAdminRequest } = require('../../middlewares/auth-requerst-validators');
const router = express.Router();

router.post('/signup', validateUserAuth, signUp);

router.post('/login', validateUserAuth, signIn);

router.get('/isAuthenticated', isAuthenticated);

router.get('/isAdmin', validateIsAdminRequest, isAdmin);

module.exports = router;