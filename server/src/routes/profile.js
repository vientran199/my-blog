const express = require('express');
const router = express.Router();
const { avatar } = require('../app/middleware/image');

const profileController = require('../app/controllers/ProfileController');
const verifyToken = require('../app/middleware/auth');

router.put('/updateInfo', verifyToken, profileController.updateInfo);
router.patch(
    '/updateAvatar',
    verifyToken,
    avatar,
    profileController.updateAvatar,
);
router.get('/:userName', verifyToken, profileController.getProfileByUsername);

module.exports = router;
