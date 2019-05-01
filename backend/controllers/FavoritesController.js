import FavoritesService from '../services/FavoritesService';
import Responses from '../core/Responses';
import DefaultController from './DefaultMediaController';


class FavoritesController {

    static async getAll(req, res) {
        await DefaultController.read(req, res, FavoritesService)
    }

    static async add(req, res) {
        await DefaultController.create(req, res, FavoritesService)
    }

    static async remove(req, res) {
        await FavoritesService.removeFromFavorites(
            req.params.media,
            1,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res)
    }
}

export default FavoritesController
