const express = require('express');
const { signup, login }  = require('../../controllers/auth-controller');
const { authenticate } = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;