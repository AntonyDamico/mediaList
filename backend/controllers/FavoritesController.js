import FavoritesService from '../services/FavoritesService';
import DefaultController from './DefaultMediaController';


class FavoritesController {

    static async getAll(req, res) {
        await DefaultController.read(req, res, FavoritesService)
    }

    static async add(req, res) {
        await DefaultController.create(req, res, FavoritesService)
    }

    static async remove(req, res) {
        await DefaultController.delete(req, res, FavoritesService)
    }
}

export default FavoritesController
