const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        imageCover: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        paragraph: [
            {
                image: {
                    type: String,
                },
                description: {
                    type: String,
                },
            },
        ],
        auth: {
            type: Schema.Types.ObjectId,
            ref: 'author',
        },
        status: {
            type: Boolean,
            required: true,
        },
        react: {
            type: Schema.Types.ObjectId,
            ref: 'react',
        },
    },
    {
        timestamps: { createdAt: 'create_at', updatedAt: 'update_at' },
    },
);

module.exports = mongoose.model('post', postSchema);
