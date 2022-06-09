const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
    {
        image: {
            type: String,
        },
        address: {
            type: String,
        },
        lives: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

module.exports = mongoose.model('profile', ProfileSchema);
