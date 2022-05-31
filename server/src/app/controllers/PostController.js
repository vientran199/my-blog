const Post = require('../models/Post');
const Auth = require('../models/Auth');

class PostController {
    //[post] /create
    async create(req, res) {
        try {
            const { title, imageCover, description, images, status } = req.body;
            const newPost = new Post({
                title,
                imageCover,
                description,
                images,
                status,
                auth: req.authId,
            });

            await newPost.save();

            res.json({
                success: true,
                message: 'Create post successfully!!!',
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}

module.exports = new PostController();
