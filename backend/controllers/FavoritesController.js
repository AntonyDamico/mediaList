import UserMediaActionsService from '../services/UserMediaActionsService';
import Responses from '../core/Responses';
import DefaultController from './DefaultMediaController';


class FavoritesController {

    static async getAll(req, res) {
        await DefaultController.read(req, res, UserMediaActionsService)
    }

    static async add(req, res) {
        await UserMediaActionsService.addToFavorite(
            req.params.media,
            1,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res)
    }

    static async remove(req, res) {
        await UserMediaActionsService.removeFromFavorites(
            req.params.media,
            1,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res)
    }
}

export default FavoritesController
