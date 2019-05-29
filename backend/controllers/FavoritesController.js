import FavoritesService from '../services/FavoritesService';
import DefaultController from './DefaultMediaController';
import ListService from "../services/ListService";


class FavoritesController {

    static async showAll(req, res) {
        const title = 'Favoritos';
        const userId = req.session.userId;
        // const mediaType = req.params.media;
        // const mediaMovie = await FavoritesService.getAll('movie', userId);
        // const mediaShow = await FavoritesService.getAll('show', userId);
        // const media = FavoritesController.mergeMedia(mediaMovie, mediaShow);
        const media = await FavoritesController.mergeMedia(FavoritesService.getAll, userId);
        const favoriteMedia = media;
        // const listMediaMovie = await ListService.getAll('movie', userId);
        // const listMediaShow = await ListService.getAll('show', userId);
        // const listMedia = FavoritesController.mergeMedia(listMediaShow, listMediaMovie);
        const listMedia = await FavoritesController.mergeMedia(ListService.getAll, userId);
        res.render('grid', {title, media, favoriteMedia, listMedia})
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


   static async mergeMedia(serviceMethod, userId) {
        const movies = await serviceMethod('movie', userId);
        const shows = await serviceMethod('show', userId);
        movies.forEach(elem => elem['mediaType'] = 'movie');
        shows.forEach(elem => elem['mediaType'] = 'show');
       return movies.concat(shows);
    }
}

export default FavoritesController
