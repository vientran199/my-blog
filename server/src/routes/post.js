const express = require('express');
const router = express.Router();

const postController = require('../app/controllers/PostController');
const verifyToken = require('../app/middleware/auth');
const upload = require('../app/middleware/image');

router.post('/create', verifyToken, upload, postController.create);
router.get('/', verifyToken, postController.get);

module.exports = router;
