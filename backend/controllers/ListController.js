import ListService from '../services/ListService';

class ListController {

    static async showList(req, res) {
        if (!ListController.isValidReq(req))
            res.status(404).send({message: 'fix the url'});

        const mediaType = req.params.media;
        const data = await ListService.getAll(mediaType, 1);
        res.status(200).send({data})
    }


    static isValidReq(req) {
        return ['movie', 'show'].includes(req.params.media)
    }
}

export default ListController;
