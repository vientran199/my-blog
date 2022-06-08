const express = require('express');
const router = express.Router();

const postController = require('../app/controllers/PostController');
const verifyToken = require('../app/middleware/auth');
const upload = require('../app/middleware/image');

router.post('/create', verifyToken, upload, postController.create);
router.get('/search', verifyToken, postController.get);
router.get('/getPostSaved', verifyToken, postController.getPostSaved);
router.put('/:id/updateReact', verifyToken, postController.updateReact);

module.exports = router;
