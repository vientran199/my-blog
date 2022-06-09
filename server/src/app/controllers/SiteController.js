const Post = require('../models/Post');
class SiteController {
    //[GET] /post
    async getPostsPublic(req, res) {
        try {
            const posts = await Post.find({ status: true }).populate('react', [
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

    async getPostById(req, res) {
        try {
            const { id: postId } = req.params;
            const post = await Post.findById(postId).populate('auth', [
                'fullName',
            ]);
            if (!post) {
                return res.status(401).json({
                    success: false,
                    message: 'Post not found',
                });
            }

            res.json({
                success: true,
                post,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Post not found',
            });
        }
    }
}

module.exports = new SiteController();
