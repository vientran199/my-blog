const express = require('express');
const router = express.Router();

const profileController = require('../app/controllers/ProfileController');
const verifyToken = require('../app/middleware/auth');

router.put('/updateInfo', verifyToken, profileController.updateInfo);

module.exports = router;
