import MediaService from '../services/MediaService';
import FavoritesService from '../services/FavoritesService';
import GenreService from '../services/GenreService';
import ListService from '../services/ListService';

class HomeController {

    static async homePage(req, res) {
        const favoriteMovies = await FavoritesService.getAll('movie', req.session.userId);
        const favoriteShows = await FavoritesService.getAll('show', req.session.userId);
        const movieData = await MediaService.getTrending('movie');
        const showData = await MediaService.getTrending('tv_show');
        const genres = await GenreService.getAllGenres();
        const listMovies = await ListService.getAll('movie', req.session.userId);
        const listShows = await ListService.getAll('show', req.session.userId);
        res.render('index', {
            movieData, showData, genres, favoriteMovies, favoriteShows,
            listMovies, listShows
        });
    }

    static async filterMediaByGenre(req, res) {
        const mediaType = 'movie';
        const genreId = req.params.genreId;
        const media = await GenreService.filterByGenre(genreId, 'movie');
        // const searchResultShow= await GenreService.filterByGenre(genreId, 'show');
        // const media = HomeController.mergeMedia(searchResultMovie, searchResultShow);

        const genres = await GenreService.getAllGenres();

        const favoriteMovies = await FavoritesService.getAll('movie', req.session.userId);
        const favoriteShows = await FavoritesService.getAll('show', req.session.userId);;
        const favoriteMedia = HomeController.mergeMedia(favoriteMovies, favoriteShows);

        const genre = await GenreService.getById(genreId);
        const title = 'Género: ' + genre[0].name;
        const listMovies = await ListService.getAll('movie', req.session.userId);
        const listShows = await ListService.getAll('show', req.session.userId);
        const listMedia = HomeController.mergeMedia(listMovies, listShows);

        res.render('grid', {title, media, genres, favoriteMedia, listMedia, mediaType});
    }


    static mergeMedia(movies, shows) {
        movies.forEach(elem => elem['mediaType'] = 'movie');
        shows.forEach(elem => elem['mediaType'] = 'show');
        return movies.concat(shows);
    }



}

export default HomeController;
