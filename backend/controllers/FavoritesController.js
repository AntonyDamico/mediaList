import FavoritesService from '../services/FavoritesService';
import DefaultController from './DefaultMediaController';


class FavoritesController {

    static async showAll(req, res) {
        const title = 'Favoritos';
        const userId = req.session.userId;
        const mediaType = req.params.media;
        const media = await FavoritesService.getAll(mediaType, userId);
        res.render('grid', {title, media, mediaType})
    }


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
