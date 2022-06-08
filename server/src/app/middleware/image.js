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
    { name: 'imageCover', maxCount: 1 },
    { name: 'paragraph0.image', maxCount: 1 },
    { name: 'paragraph1.image', maxCount: 1 },
    { name: 'paragraph2.image', maxCount: 1 },
    { name: 'paragraph3.image', maxCount: 1 },
    { name: 'paragraph4.image', maxCount: 1 },
    { name: 'paragraph5.image', maxCount: 1 },
    { name: 'paragraph6.image', maxCount: 1 },
    { name: 'paragraph7.image', maxCount: 1 },
    { name: 'paragraph8.image', maxCount: 1 },
    { name: 'paragraph9.image', maxCount: 1 },
]);

module.exports = upload;
