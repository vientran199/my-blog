const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        auth: {
            type: Schema.Types.ObjectId,
            ref: 'authors',
        },
        image: {
            data: Buffer,
            contentType: String,
        },
    },
    {
        timestamps: { createdAt: 'create_at', updatedAt: 'update_at' },
    },
);

module.exports = mongoose.model('images', imageSchema);
