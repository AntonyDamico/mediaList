import MediaService from '../services/MediaService';
import DefaultController from './DefaultMediaController';


class MediaController {

    static async getAll(req, res) {
        await DefaultController.read(req, res, MediaService)
    }

    static async getMedia(req, res) {
        const media = req.params.media;
        const id = req.params.id;
        const mediaData = await MediaService.getMedia(media, id);
        res.render('media', {media: mediaData[0]})
    }

}

export default MediaController
