const authRouter = require('./auth');
const postRouter = require('./post');
const siteRouter = require('./site');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/post', postRouter);
    app.use('/', siteRouter);
}

module.exports = route;
