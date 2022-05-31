const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
const verifyToken = require('../app/middleware/auth');

router.post('/create', authController.create);
router.get('/', verifyToken, authController.me);
router.post('/login', authController.login);
module.exports = router;
