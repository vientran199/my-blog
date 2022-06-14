const authRouter = require('./auth');
const postRouter = require('./post');
const profileRouter = require('./profile');
const siteRouter = require('./site');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/post', postRouter);
    app.use('/api/profile', profileRouter);
    app.use('/api', siteRouter);
    app.get('/', (req, res) => {
        res.render('Hello server');
    });
}

module.exports = route;
