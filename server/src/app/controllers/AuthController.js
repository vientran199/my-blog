const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const Auth = require('../models/Auth');
const Profile = require('../models/Profile');

class AuthController {
    //[GET] / , kiểm tra user login
    async me(req, res) {
        try {
            const author = await Auth.findById(req.authId)
                .populate('profile')
                .select('-password');
            if (!author) {
                return res.status(400).json({
                    success: false,
                    message: 'Auth not found',
                });
            }

            return res.status(200).json({
                success: true,
                author: author,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    //[post] /register
    async register(req, res) {
        try {
            const { fullName, userName, email, password } = req.body;
            const author = await Auth.findOne({ email: email });
            const userNameCheck = await Auth.findOne({ userName: userName });
            if (author) {
                return res.status(400).json({
                    success: false,
                    type: 'email',
                    message: 'Email already taken',
                });
            }
            if (userNameCheck) {
                return res.status(400).json({
                    success: false,
                    type: 'userName',
                    message: 'Username already taken',
                });
            }
            const hashedPassword = await argon2.hash(password);
            const newProfile = new Profile();
            const newAuth = new Auth({
                userName: userName,
                fullName: fullName,
                email: email,
                password: hashedPassword,
                profile: newProfile._id,
            });
            await newProfile.save();
            await newAuth.save();

            const accessToken = jwt.sign(
                { authId: newAuth._id },
                process.env.ACCESS_TOKEN_SECRET,
            );
            res.status(200).json({
                success: true,
                message: 'User created successfull',
                accessToken,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    //[POST]  /login
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const author = await Auth.findOne({ email: email });
            if (!author) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect email or password',
                });
            }

            const passwordValid = await argon2.verify(
                author.password,
                password,
            );

            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect email or password',
                });
            }

            const accessToken = jwt.sign(
                { authId: author._id },
                process.env.ACCESS_TOKEN_SECRET,
            );

            res.status(200).json({
                success: true,
                message: 'Login successfull',
                accessToken: accessToken,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                sucess: false,
                message: 'Internal server error',
            });
        }
    }

    //[PATCH] /api/auth/changePassword
    async changePassword(req, res) {
        const { email, oldPassword, newPassword } = req.body;
        try {
            const auth = await Auth.findOne({ email: email });
            if (!auth) {
                return res.status(401).json({
                    success: false,
                    message: 'Email does not exist',
                });
            }
            const passwordValid = await argon2.verify(
                auth.password,
                oldPassword,
            );
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect password',
                });
            }
            const hashedPassword = await argon2.hash(newPassword);

            let updatedAuth = {
                password: hashedPassword,
            };
            updatedAuth = await Auth.findOneAndUpdate(
                { _id: auth._id },
                updatedAuth,
                { new: true },
            );
            res.json({
                success: true,
                message: 'Change password successfull!',
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

module.exports = new AuthController();
