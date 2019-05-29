import YearService from '../services/YearService';
import FavoritesService from "../services/FavoritesService";
import ListService from "../services/ListService";

class YearFilterController {

    static async getMovies(req, res) {
        const start = req.query.start;
        const end = req.query.end;
        const userId = req.session.userId;

        let title = "Peliculas ";

        if(start) {
            title += "desde " + start ;
        }

        if(end) {
            title += ' hasta ' + end;
        }

        const media = await YearService.getMediaByYear(start, end);

        const favoriteMedia = await YearFilterController.mergeMedia(FavoritesService.getAll, userId);
        const listMedia = await YearFilterController.mergeMedia(ListService.getAll, userId);

        console.log(favoriteMedia);
        res.render('grid', {title, media, favoriteMedia, listMedia})
    }

    static async mergeMedia(serviceMethod, userId) {
        const movies = await serviceMethod('movie', userId);
        const shows = await serviceMethod('show', userId);
        movies.forEach(elem =>{
            elem['mediaType'] = 'movie';
            // elem.id = elem['movie_id']
        });
        shows.forEach(elem => {
            elem['mediaType'] = 'show';
            // elem.id = elem['show_id'];
        });
        return movies.concat(shows);
    }
}

export default YearFilterController
