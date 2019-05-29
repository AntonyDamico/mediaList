import MediaService from '../services/MediaService';
import DefaultController from './DefaultMediaController';
import FavoritesService from "../services/FavoritesService";
import ListService from "../services/ListService";


class MediaController {

    static async getAll(req, res) {
        await DefaultController.read(req, res, MediaService)
    }

    static async getMedia(req, res) {
        const media = req.params.media;
        const id = req.params.id;
        const mediaData = await MediaService.getMedia(media, id);
        console.log(mediaData[0])
        const favoriteMediaShow = await FavoritesService.getAll('show', req.session.userId);
        const listMediaShow = await ListService.getById('show', req.session.userId, id);
        const favoriteMediaMovie = await FavoritesService.getAll('movie', req.session.userId);
        const listMediaSMovie = await ListService.getById('movie', req.session.userId, id);
        const listMedia = listMediaShow.concat(listMediaSMovie);
        const favoriteMedia = favoriteMediaShow.concat(favoriteMediaMovie);
        res.render('media', {media: mediaData[0], favoriteMedia, listMedia, mediaType: media})
    }

}

export default MediaController
