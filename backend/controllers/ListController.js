import ListService from '../services/ListService';

class ListController {

    static showList(req, res) {
        if (!ListController.isValidReq(req))
            res.status(404).send({message: 'fix the url'});

        const mediaType = req.params.media;

        ListService.getAll(mediaType, 1)
            .then(data => res.status(202).send({data}));
    }


    static isValidReq(req) {
        return ['movie', 'show'].includes(req.params.media)
    }
}

export default ListController;
