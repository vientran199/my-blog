const mongoose = require('mongoose');

async function connect(app, port) {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dlbxewu.mongodb.net/my-blog?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Connection DB successfully!!!');
        app.listen(port, () =>
            console.log(`Server is running on port ${port}`),
        );
    } catch (error) {
        console.log('fail');
        console.log(error);
        process.exit(1);
    }
}

module.exports = { connect };
