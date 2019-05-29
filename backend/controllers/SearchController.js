import SearchSevice from '../services/SearchService';
import FavoritesService from "../services/FavoritesService";
import ListService from "../services/ListService";

class SearchController {

    static async search(req, res) {
        const term = req.query.searchTerm;
        const title = 'Búsqueda: ' + term;
        const mediaMovies = await SearchSevice.search(term, 'movie');
        const mediaShows = await SearchSevice.search(term, 'tv_show');
        const media = SearchController.mergeMedia(mediaMovies, mediaShows);
        const favoriteMovies = await FavoritesService.getAll('movie', req.session.userId);
        const favoriteShows = await FavoritesService.getAll('movie', req.session.userId);
        const favoriteMedia = SearchController.mergeMedia(favoriteMovies, favoriteShows);
        const listMovie = await ListService.getAll('movie', req.session.userId);
        const listShow = await ListService.getAll('movie', req.session.userId);
        const listMedia = SearchController.mergeMedia(listMovie, listShow);
        console.log(favoriteMedia);
        res.render('grid', {title, media, favoriteMedia, listMedia});
    }


    static mergeMedia(movies, shows) {
        movies.forEach(elem => elem['mediaType'] = 'movie');
        shows.forEach(elem => elem['mediaType'] = 'show');
        return movies.concat(shows);
    }

}

export default SearchController;
