const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
    },
    love: {
        type: [String],
    },
    commen: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'author',
            },
            comment: {
                type: String,
            },
        },
    ],
    marked: {
        type: [String],
    },
});

module.exports = mongoose.model('react', reactSchema);
