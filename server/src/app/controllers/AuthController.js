class AuthController {

    //[GET] /news
    index(req, res){
        res.render('auth')
    }
}

module.exports = new AuthController