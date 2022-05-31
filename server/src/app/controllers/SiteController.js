class SiteController {
    //[GET] /site
    index(req, res) {
        res.send('hello');
    }
}

module.exports = new SiteController();
