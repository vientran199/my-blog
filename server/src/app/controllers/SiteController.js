const Post = require('../models/Post');
class SiteController {
    //[GET] /post
    async getPostsPublic(req, res) {
        try {
            const posts = await Post.find({ status: true });
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
}

module.exports = new SiteController();
