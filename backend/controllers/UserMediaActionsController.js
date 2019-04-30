import UserMediaActionsService from '../services/UserMediaActionsService';

class UserMediaActionsController {

    static async getFavorites(req, res) {
        const media = req.params.media;
        const data = await UserMediaActionsService.getFavorites(media, 1);
        res.status(200).send({data});
    }

    static async addToFavorites(req, res) {
        const media = req.params.media;

    }
}

export default UserMediaActionsController
