import SearchSevice from '../services/SearchService';
import FavoritesService from "../services/FavoritesService";
import ListService from "../services/ListService";

class SearchController {

    static async search(req, res) {
        const term = req.query.searchTerm;
        const title = 'Búsqueda: ' + term;
        const mediaType = 'movie';
        const media = await SearchSevice.search(term);
        const favoriteMedia = await FavoritesService.getAll('movie', req.session.userId);
        const listMedia = await ListService.getAll('movie', req.session.userId);
        res.render('grid', {title, mediaType, media, favoriteMedia, listMedia});
    }

}

export default SearchController;
