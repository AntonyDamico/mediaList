import ListService from '../services/ListService';

class ListController {

    static showList(req, res) {
        if (!this.isValidRequest(req))
            res.status(404).send({message: 'fix the url'});

        const mediaType = req.params.media;

        ListService.getAll(mediaType, 1, dbRes => {
            res.status(202).send({data: dbRes});
        })
    }


    static isValidRequest(req) {
        return ['movie', 'show'].includes(req.params.media)
    }
}

export default ListController;
