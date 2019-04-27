class HomeController {

    homePage(req, res) {
        res.send('hello');
    }
}

export default new HomeController();
