const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
const verifyToken = require('../app/middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/', verifyToken, authController.me);
module.exports = router;
