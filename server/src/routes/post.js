const express = require('express');
const router = express.Router();

const postController = require('../app/controllers/PostController');
const verifyToken = require('../app/middleware/auth');
const { upload } = require('../app/middleware/image');

router.post('/create', verifyToken, upload, postController.create);
router.get('/filter', verifyToken, postController.get);
router.get('/search', postController.search);
router.get('/getPostSaved', verifyToken, postController.getPostSaved);
router.put('/:id/updateReact', verifyToken, postController.updateReact);
router.put('/:id', verifyToken, upload, postController.updatePost);
router.delete('/:id', verifyToken, postController.deleteById);

module.exports = router;
