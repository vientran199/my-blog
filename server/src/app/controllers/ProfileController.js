const Profile = require('../models/Profile');
const Auth = require('../models/Auth');
const Post = require('../models/Post');

class ProfileController {
    //[GET] /api/profile/:userName
    async getProfileByUsername(req, res) {
        const { userName } = req.params;

        try {
            const profile = await Auth.findOne({ userName: userName })
                .populate('profile')
                .select('-password');
            if (!profile) {
                return res.status(400).json({
                    success: false,
                    message: 'Not found user',
                });
            }
            const posts = await Post.find({ auth: profile._id }).populate(
                'react',
            );
            res.json({
                success: true,
                profile,
                posts,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                sucess: false,
                message: 'Internal server error',
            });
        }
    }
    //[PUT] /api/profile/updateInfo
    // update info ca nhan
    async updateInfo(req, res) {
        const { address, lives, facebook, instagram } = req.body;
        try {
            const auth = await Auth.findById(req.authId);

            const newProfile = await Profile.findByIdAndUpdate(
                auth.profile.toString(),
                {
                    address: address || '',
                    lives: lives || '',
                    facebook: facebook || '',
                    instagram: instagram || '',
                },
                {
                    new: true,
                },
            );
            if (!newProfile) {
                return res.status(400).json({
                    success: false,
                });
            }

            res.json({
                success: true,
                newProfile,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                sucess: false,
                message: 'Internal server error',
            });
        }
    }
}

module.exports = new ProfileController();
