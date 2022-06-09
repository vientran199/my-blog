const Profile = require('../models/Profile');
const Auth = require('../models/Auth');

class ProfileController {
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
