import FavoritesService from '../services/FavoritesService';
import DefaultController from './DefaultMediaController';
import ListService from "../services/ListService";


class FavoritesController {

    static async showAll(req, res) {
        const title = 'Favoritos';
        const userId = req.session.userId;
        const mediaType = req.params.media;
        const media = await FavoritesService.getAll(mediaType, userId);
        const favoriteMedia = media;
        const listMedia = await ListService.getAll('movie', req.session.userId);
        res.render('grid', {title, media, mediaType, favoriteMedia, listMedia})
    }


    static async getAll(req, res) {
        await DefaultController.read(req, res, FavoritesService)
    }

    static async add(req, res) {
        console.log('favorites controller')
        await DefaultController.create(req, res, FavoritesService)
    }

    static async remove(req, res) {
        await DefaultController.delete(req, res, FavoritesService)
    }
}

export default FavoritesController
