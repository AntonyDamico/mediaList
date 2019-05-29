import MediaService from '../services/MediaService';
import FavoritesService from '../services/FavoritesService';
import GenreService from '../services/GenreService';

class HomeController {

    static async homePage(req, res) {
        const favoriteMovies = await FavoritesService.getAll('movie', req.session.userId);
        const favoriteShows = await FavoritesService.getAll('show', req.session.userId);
        const isLoggedIn = req.session.userId !== undefined;
        const movieData = await MediaService.getTrending('movie');
        const showData = await MediaService.getTrending('tv_show');
        const genres = await GenreService.getAllGenres();
        res.render('index', {movieData, showData, genres, isLoggedIn, favoriteMovies, favoriteShows});
    }

    static async filterMediaByGenre(req, res) {
        const mediaType = 'movie';
        const isLoggedIn = req.session.userId !== undefined;
        const genreId = req.params.genreId;
        const media = await GenreService.filterByGenre(genreId);
        const genres = await GenreService.getAllGenres();
        const favoriteMovies = await FavoritesService.getAll('movie', req.session.userId);
        const favoriteShows = await FavoritesService.getAll('show', req.session.userId);
        const genre = await GenreService.getById(genreId);
        console.log(genre);
        const title = 'Género: ' + genre[0].name;
        res.render('grid', {title, media, isLoggedIn, genres, favoriteMovies, favoriteShows, mediaType})
    }
}

export default HomeController;
