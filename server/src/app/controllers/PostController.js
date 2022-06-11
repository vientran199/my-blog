const Post = require('../models/Post');
const React = require('../models/React');

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
            const react = new React();
            const newPost = new Post({
                title,
                imageCover: imageCover[0].path,
                description,
                paragraph: paragraph,
                status,
                auth: req.authId,
                react: react._id,
            });
            react.post = newPost._id;
            await react.save();
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

    //[PUT] /post/:id/updateReact   {type: 'marked/update/love/commen', data: { }}
    async updateReact(req, res) {
        try {
            const { type } = req.body;
            const { id: postId } = req.params;

            let post = await Post.findById(postId).populate('react');
            const react = post.react;
            switch (type) {
                case 'marked':
                    const currentListMarked = react.marked;
                    const isExits = currentListMarked.includes(req.authId);
                    const isAuthor = post.auth.toString() === req.authId;
                    if (isAuthor) {
                        return res.status(401).json({
                            success: false,
                        });
                    }
                    let newListMarked = [];
                    if (isExits) {
                        newListMarked = currentListMarked.filter(
                            (item) => item !== req.authId,
                        );
                    } else {
                        newListMarked = [...currentListMarked, req.authId];
                    }
                    const responseMark = await React.updateOne(
                        { _id: react._id },
                        { marked: newListMarked },
                    );
                    if (!responseMark.modifiedCount) {
                        return res.status(401).json({
                            success: false,
                        });
                    }
                    res.json({
                        success: true,
                        length: newListMarked.length,
                    });
                    break;

                case 'love':
                    const currentListLove = react.love;
                    const isExitsLove = currentListLove.includes(req.authId);
                    let newListLove = [];
                    if (isExitsLove) {
                        newListLove = currentListLove.filter(
                            (item) => item !== req.authId,
                        );
                    } else {
                        newListLove = [...currentListLove, req.authId];
                    }
                    const responseLove = await React.updateOne(
                        { _id: react._id },
                        { love: newListLove },
                    );
                    if (!responseLove.modifiedCount) {
                        return res.status(401).json({
                            success: false,
                        });
                    }
                    res.json({
                        success: true,
                        length: newListLove.length,
                    });
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error,
            });
        }
    }

    async updatePost(req, res) {
        const {
            title,
            imageCover: srcImageCOver,
            description,
            status,
            ...descriptions
        } = req.body;
        const { imageCover, ...images } = req.files;
        const { id: postId } = req.params;
        const post = await Post.findById(postId);

        if (!post || req.authId !== post.auth._id.toString()) {
            return res.status(405).json({
                success: false,
                message: 'User not allow',
            });
        }
        try {
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
            const newPost = {
                title,
                imageCover: srcImageCOver ? srcImageCOver : imageCover[0].path,
                description,
                paragraph: paragraph,
                status,
            };

            const newPost1 = await Post.findByIdAndUpdate(postId, newPost, {
                new: true,
            });
            res.json({
                success: true,
                message: 'Updated post successfully',
                newPost: newPost1,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error,
            });
        }
    }
    //[GET] /post/filter?status=
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
            const posts = await Post.find(valueFilter).populate('react', [
                'love',
                'marked',
                'commen',
            ]);
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

    //[GET] /post/search?q=
    async search(req, res) {
        const { q } = req.query;
        try {
            const posts = await Post.find({ $text: { $search: q } }).populate(
                'react',
            );
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
    //[GET] /getPostSaved
    async getPostSaved(req, res) {
        try {
            const postSaved = await React.find({ marked: req.authId }).populate(
                'post',
            );
            res.json({
                success: true,
                posts: postSaved,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error,
            });
        }
    }

    //[DELTE] /post/:id
    async deleteById(req, res) {
        const { id: postId } = req.params;
        try {
            const postDelete = await Post.findByIdAndDelete(postId);
            if (!postDelete) {
                return res.status(400).json({
                    success: false,
                    message: 'Not found post',
                });
            }
            const reactDelete = await React.findByIdAndDelete(
                postDelete.react.toString(),
            );
            if (!reactDelete) {
                return res.status(400).json({
                    success: false,
                    message: 'Not found post',
                });
            }
            res.json({
                success: true,
                postDelete: postDelete,
                message: 'Delete post successfully',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error,
            });
        }
    }
}

module.exports = new PostController();
