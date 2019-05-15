import MediaService from '../services/MediaService';

class HomeController {

    static async homePage(req, res) {
        const movieData = await MediaService.getTrending('movie');
        const showData = await MediaService.getTrending('tv_show');
        res.render('index', {movieData, showData});
    }
}

export default HomeController;
