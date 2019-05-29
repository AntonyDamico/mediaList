import Responses from '../core/Responses'
import DefaultMediaController from './DefaultMediaController';
import RatingService from '../services/RatingService';
import YearService from "../services/YearService";
import FavoritesService from "../services/FavoritesService";
import ListService from "../services/ListService";

class RatingController {

    static async create(req, res) {
        DefaultMediaController.checkValidReq(req, res);

        const data = await RatingService.insert(
            req.params.media,
            1,
            req.body.media_id,
            req.body.rating
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res, data)
    }

    static async filterByRating(req, res) {

        const stars = req.query.stars;
        const userId = req.session.userId;

        let title = stars + ' estrellas';

        const media = await RatingService.filterByRating(stars);

        const favoriteMedia = await RatingController.mergeMedia(FavoritesService.getAll, userId);
        const listMedia = await RatingController.mergeMedia(ListService.getAll, userId);

        res.render('grid', {title, media, favoriteMedia, listMedia})
    }


    static async mergeMedia(serviceMethod, userId) {
        const movies = await serviceMethod('movie', userId);
        const shows = await serviceMethod('show', userId);
        movies.forEach(elem => elem['mediaType'] = 'movie');
        shows.forEach(elem => elem['mediaType'] = 'show');
        return movies.concat(shows);
    }
}

export default RatingController;
