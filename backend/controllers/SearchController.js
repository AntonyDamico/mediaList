import SearchSevice from '../services/SearchService';
import FavoritesService from "../services/FavoritesService";

class SearchController {

    static async search(req, res) {
        const term = req.query.searchTerm;
        const title = 'Búsqueda: ' + term;
        const mediaType = 'movies';
        const media = await SearchSevice.search(term);
        const favoriteMovies = await FavoritesService.getAll('movie', req.session.userId);
        res.render('grid', {title, mediaType, media, favoriteMovies});
    }

}

export default SearchController;
