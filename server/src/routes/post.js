const express = require('express');
const router = express.Router();

const postController = require('../app/controllers/PostController');
const verifyToken = require('../app/middleware/auth');

router.post('/create', verifyToken, postController.create);

module.exports = router;
