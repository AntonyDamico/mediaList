import ListService from '../services/ListService';
import Responses from '../core/Responses'
import DefaultController from './DefaultMediaController';

class ListController {

    static async showList(req, res) {
        await DefaultController.read(req, res, ListService)
    }


    static async addToList(req, res) {
        await DefaultController.create(req, res, ListService)
    }


    static async removeFromList(req, res) {
        if (!ListController.isValidReq(req))
            Responses.failed(res, 'fix the url');

        const data = await ListService.delete(
            req.params.media,
            1,
            req.body.media_id
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res, data)
    }


    static isValidReq(req) {
        return ['movie', 'show'].includes(req.params.media)
    }
}

export default ListController;
