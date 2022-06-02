const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const Auth = require('../models/Auth');

class AuthController {
    //[GET] / , kiểm tra user login
    async me(req, res) {
        try {
            const author = await Auth.findById(req.authId).select('-password');
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
            const { fullName, email, password } = req.body;
            const author = await Auth.findOne({ email: email });

            if (author) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Email already taken' });
            }
            const hashedPassword = await argon2.hash(password);
            const newAuth = new Auth({
                fullName: fullName,
                email: email,
                password: hashedPassword,
            });
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
}

module.exports = new AuthController();
