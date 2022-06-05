const multer = require('multer');

const Storage = multer.diskStorage({
    destination: 'src/public/uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({
    storage: Storage,
}).fields([
    { name: 'imageCover', maxCount: 2 },
    { name: 'image', maxCount: 10 },
]);

module.exports = upload;
