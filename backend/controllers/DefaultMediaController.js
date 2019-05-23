import Responses from '../core/Responses'

class DefaultMediaController {

    static async read(req, res, Service) {
        // DefaultMediaController.checkValidReq(req, res);

        const userId = req.session.userId;
        const mediaType = req.params.media;
        const data = await Service.getAll(mediaType, userId)
            .catch(err => Responses.failed(res, err));

        Responses.successful(res, data)
    }


    static async getById(req, res, Service) {
        DefaultMediaController.checkValidReq(req, res);

        const userId = req.session.userId;
        const mediaType = req.params.media;
        const mediaId = req.params.id;
        const data = await Service.getById(mediaType, mediaId, userId)
            .catch(err => Responses.failed(res, err));

        Responses.successful(res, data)
    }


    static async create(req, res, Service) {
        // DefaultMediaController.checkValidReq(req, res);

        const userId = req.session.userId;
        const data = await Service.insert(
            req.params.media,
            userId,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res, data)
    }


    static async delete(req, res, Service) {
        DefaultMediaController.checkValidReq(req, res);

        const userId = req.session.userId;
        await Service.delete(
            req.params.media,
            userId,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res)
    }


    static checkValidReq(req, res) {
        // if (!req.session.userId) res.redirect('/');
        if (!DefaultMediaController.isValidReq(req))
            Responses.failed(res, null, 'fix the url');
    }

    static isValidReq(req) {
        return ['movie', 'show'].includes(req.params.media)
    }
}

export default DefaultMediaController;
