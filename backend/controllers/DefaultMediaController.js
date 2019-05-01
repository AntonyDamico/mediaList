import ListService from '../services/ListService';
import Responses from '../core/Responses'

class ListController {

    static async read(req, res, Service) {
        if (!ListController.isValidReq(req))
            Responses.failed(res, 'fix the url');

        const mediaType = req.params.media;
        const data = await Service.getAll(mediaType, 1)
            .catch(err => Responses.failed(res, err));

        Responses.successful(res, data)
    }


    static async create(req, res) {
        if (!ListController.isValidReq(req))
            Responses.failed(res, 'fix the url');

        await ListService.insert(
            req.params.media,
            1,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res)
    }


    static async delete(req, res) {
        if (!ListController.isValidReq(req))
            Responses.failed(res, 'fix the url');

        await ListService.delete(
            req.params.media,
            1,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res)
    }


    static isValidReq(req) {
        return ['movie', 'show'].includes(req.params.media)
    }
}

export default ListController;
