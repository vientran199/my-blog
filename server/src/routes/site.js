// Site thường để viết cho các trang đơn giản, có 1 vài chức năng chính như
// Home, Search, contact
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/', siteController.index);

module.exports = router;
