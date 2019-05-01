import ListService from '../services/ListService';
import Responses from '../core/Responses'

class DefaultMediaController {

    static async read(req, res, Service) {
        DefaultMediaController.checkValidReq(req, res);

        const mediaType = req.params.media;
        const data = await Service.getAll(mediaType, 1)
            .catch(err => Responses.failed(res, err));

        Responses.successful(res, data)
    }


    static async create(req, res, Service) {
        DefaultMediaController.checkValidReq(req, res);

        const data = await Service.insert(
            req.params.media,
            1,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res, data)
    }


    static async delete(req, res) {
        DefaultMediaController.checkValidReq(req, res);

        await ListService.delete(
            req.params.media,
            1,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res)
    }


    static checkValidReq(req, res) {
        if (!DefaultMediaController.isValidReq(req))
            Responses.failed(res, null, 'fix the url');
    }

    static isValidReq(req) {
        return ['movie', 'show'].includes(req.params.media)
    }
}

export default DefaultMediaController;
