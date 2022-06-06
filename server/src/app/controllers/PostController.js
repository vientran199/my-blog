const Post = require('../models/Post');
const Image = require('../models/Image');

class PostController {
    //[post] /create
    async create(req, res) {
        try {
            const { title, description, description1, status } = req.body;
            const { imageCover, image } = req.files;
            const newPost = new Post({
                title,
                imageCover: imageCover[0].path,
                description,
                images: [
                    {
                        image: image[0].path,
                        description: description1,
                    },
                ],
                status,
                auth: req.authId,
            });

            await newPost.save();

            res.json({
                success: true,
                message: 'Create post successfully',
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error,
            });
        }
    }

    //[GET] /
    async get(req, res) {
        try {
            // filter: all,public,private
            const { status } = req.query;
            let valueFilter = null;
            if (status === 'public') {
                valueFilter = {
                    auth: req.authId,
                    status: true,
                };
            } else if (status === 'private') {
                valueFilter = {
                    auth: req.authId,
                    status: false,
                };
            } else {
                valueFilter = {
                    auth: req.authId,
                };
            }
            const posts = await Post.find(valueFilter);
            res.json({
                success: true,
                posts,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error,
            });
        }
    }

    //[GET] /:id
}

module.exports = new PostController();
