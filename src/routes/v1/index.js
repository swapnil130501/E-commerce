const express = require('express');
const { signUp, signIn }  = require('../../controllers/auth-controller');
const {validateUserAuth} = require('../../middlewares/auth-requerst-validators');
const router = express.Router();

router.post('/signup', validateUserAuth, signUp);

router.post('/login', validateUserAuth, signIn);

module.exports = router;