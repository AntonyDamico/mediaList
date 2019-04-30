import UserMediaActionsService from '../services/UserMediaActionsService';
import Response from '../core/Responses';

class UserMediaActionsController {

    static async getFavorites(req, res) {
        const media = req.params.media;
        const data = await UserMediaActionsService.getFavorites(media, 1)
            .catch(error => Response.failed(res, error, 'Something went wrong'));
        Response.successful(res, data);
    }

    static async addToFavorites(req, res) {
        const media = req.params.media;

    }
}

export default UserMediaActionsController
