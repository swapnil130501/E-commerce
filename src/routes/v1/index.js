const express = require('express');
const router = express.Router();

const { 
    signUp, 
    signIn, 
    deleteUser,
    updateUser, 
    isAuthenticated, 
    isAdmin 
}  = require('../../controllers/auth-controller');

const { validateUserAuth, validateIsAdminRequest } = require('../../middlewares/auth-requerst-validators');


router.post('/signup', validateUserAuth, signUp);
router.post('/login', validateUserAuth, signIn);
router.delete('/user/delete/:id', deleteUser);
router.patch('/user/update/:id', updateUser);
router.get('/isAuthenticated', isAuthenticated);
router.get('/isAdmin', validateIsAdminRequest, isAdmin);


module.exports = router;