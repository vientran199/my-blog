const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'profile',
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

module.exports = mongoose.model('author', AuthSchema);
