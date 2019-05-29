import ListService from '../services/ListService';
import DefaultController from './DefaultMediaController';
import FavoriteService from '../services/FavoritesService'

class ListController {

    static async showAll(req, res) {
        const title = 'Lista por Ver';
        const userId = req.session.userId;
        // const mediaType = req.params.media;
        const media = await ListController.mergeMedia(ListService.getAll, userId);
        // media.forEach(elem => elem.id = elem[mediaType + '_id']);
        const listMedia = media;
        // const favoriteMedia = await FavoriteService.getAll(mediaType, userId);
        // console.log(media);
        const favoriteMedia = await ListController.mergeMedia(FavoriteService.getAll, userId);
        res.render('grid', {title, media, favoriteMedia, listMedia})
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

    static async mergeMedia(serviceMethod, userId) {
        const movies = await serviceMethod('movie', userId);
        const shows = await serviceMethod('show', userId);
        movies.forEach(elem =>{
            elem['mediaType'] = 'movie';
            elem.id = elem['movie_id']
        });
        shows.forEach(elem => {
            elem['mediaType'] = 'show';
            elem.id = elem['show_id'];
        });
        return movies.concat(shows);
    }

}

export default ListController;
