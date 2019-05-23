import MediaService from '../services/MediaService';
import FavoritesService from '../services/FavoritesService';

class HomeController {

    static async homePage(req, res) {
        const favoriteMovies = await FavoritesService.getAll('movie', req.session.userId);
        const favoriteShows = await FavoritesService.getAll('show', req.session.userId);
        console.log(favoriteShows);
        const isLoggedIn = req.session.userId !== undefined;
        const movieData = await MediaService.getTrending('movie');
        const showData = await MediaService.getTrending('tv_show');
        const genres = await MediaService.getAllGenres();
        res.render('index', {movieData, showData, genres, isLoggedIn, favoriteMovies, favoriteShows});
    }

    static async filterMediaByGenre(req, res) {
        const isLoggedIn = req.session.userId !== undefined;
        const genreId = req.params.genreId;
        const mediaData = await MediaService.filterByGenre(genreId);
        const genres = await MediaService.getAllGenres();
        res.render('filter', {mediaData, isLoggedIn, genres})
    }
}

export default HomeController;
