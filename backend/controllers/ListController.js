import ListService from '../services/ListService';
import Responses from '../core/Responses'
import DefaultController from './DefaultMediaController';

class ListController {

    static async showList(req, res) {
        await DefaultController.read(req, res, ListService)
    }


    static async addToList(req, res) {
        if (!ListController.isValidReq(req))
            Responses.failed(res, 'fix the url');

        await ListService.insert(
            req.params.media,
            1,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res)
    }


    static async removeFromList(req, res) {
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
