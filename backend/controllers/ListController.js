import ListService from '../services/ListService';
import DefaultController from './DefaultMediaController';

class ListController {

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
