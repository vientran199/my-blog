const Post = require('../models/Post');
const Image = require('../models/Image');

class PostController {
    //[post] /create
    async create(req, res) {
        try {
            const { title, description, status, ...descriptions } = req.body;
            const { imageCover, ...images } = req.files;

            let paragraph = [];
            for (let i = 0; i < 10; i++) {
                if (
                    images[`paragraph${i}.image`] ||
                    descriptions[`paragraph${i}.description`]
                ) {
                    if (!images[`paragraph${i}.image`]) {
                        const temp = {
                            image: '',
                            description:
                                descriptions[`paragraph${i}.description`],
                        };
                        paragraph.push(temp);
                    } else if (!descriptions[`paragraph${i}.description`]) {
                        const temp = {
                            image: images[`paragraph${i}.image`][0].path,
                            description: '',
                        };
                        paragraph.push(temp);
                    } else {
                        const temp = {
                            image: images[`paragraph${i}.image`][0].path,
                            description:
                                descriptions[`paragraph${i}.description`],
                        };
                        paragraph.push(temp);
                    }
                }
            }
            const newPost = new Post({
                title,
                imageCover: imageCover[0].path,
                description,
                paragraph: paragraph,
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
