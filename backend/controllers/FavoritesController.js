import UserMediaActionsService from '../services/UserMediaActionsService';
import Responses from '../core/Responses';

class FavoritesController {

    static async getAll(req, res) {
        const media = req.params.media;
        const data = await UserMediaActionsService.getFavorites(media, 1)
            .catch(error => Responses.failed(res, error, 'Something went wrong'));
        Responses.successful(res, data);
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
