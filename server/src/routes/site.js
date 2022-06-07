// Site thường để viết cho các trang đơn giản, có 1 vài chức năng chính như
// Home, Search, contact
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/getPostsPublic', siteController.getPostsPublic);
router.get('/post/:id', siteController.getPostById);

module.exports = router;
