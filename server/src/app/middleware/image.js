const multer = require('multer');

const Storage = multer.diskStorage({
    destination: 'src/public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: Storage,
}).fields([
    { name: 'imageCover', maxCount: 2 },
    { name: 'image', maxCount: 10 },
]);

module.exports = upload;
