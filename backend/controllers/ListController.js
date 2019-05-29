import ListService from '../services/ListService';
import DefaultController from './DefaultMediaController';
import FavoriteService from '../services/FavoritesService'

class ListController {

    static async showAll(req, res) {
        const title = 'Lista por Ver';
        const userId = req.session.userId;
        const mediaType = req.params.media;
        console.log(mediaType);
        const media = await ListService.getAll(mediaType, userId);
        media.forEach(elem => elem.id = elem[mediaType + '_id']);
        const listMedia = media;
        const favoriteMedia = await FavoriteService.getAll(mediaType, userId);
        console.log(media);
        res.render('grid', {title, media, mediaType, favoriteMedia, listMedia})
    }

    static async showList(req, res) {
        await DefaultController.read(req, res, ListService)
    }


    static async addToList(req, res) {
        await DefaultController.create(req, res, ListService)
    }


    static async removeFromList(req, res) {
        await DefaultController.delete(req, res, ListService);
    }

}

export default ListController;
