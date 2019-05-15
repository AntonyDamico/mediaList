import MediaService from '../services/MediaService';
import DefaultController from './DefaultMediaController';


class FavoritesController {

    static async getAll(req, res) {
        await DefaultController.read(req, res, MediaService)
    }

    static async getById(req, res) {

    }
}

export default FavoritesController
