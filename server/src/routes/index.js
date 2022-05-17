const authRouter = require('./auth')
const siteRouter = require('./site')

function route(app){
    app.use('/api/auth', authRouter)
    app.use('/api/site', siteRouter)
}

module.exports = route;
