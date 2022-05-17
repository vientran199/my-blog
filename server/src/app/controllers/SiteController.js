class SiteController {

    //[GET] /site
    index(req, res){
        res.render('site')
    }
}

module.exports = new SiteController
