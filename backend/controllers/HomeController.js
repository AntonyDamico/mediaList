import MediaService from '../services/MediaService';

class HomeController {

    static async homePage(req, res) {
        const isLoggedIn = req.session.userId !== undefined;
        const movieData = await MediaService.getTrending('movie');
        const showData = await MediaService.getTrending('tv_show');
        const genres = await MediaService.getAllGenres();
        res.render('index', {movieData, showData, genres, isLoggedIn});
    }

    static async filterMediaByGenre(req, res) {
        const genreId = req.params.genreId;
        const mediaData = await MediaService.filterByGenre(genreId);
        res.status(200).send({mediaData})
    }
}

export default HomeController;
