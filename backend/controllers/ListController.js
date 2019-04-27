import ListService from '../services/ListService';

class ListController {

    static showList(req, res) {
        const mediaType = req.params.media;

        if (!['movie', 'show'].includes(mediaType)) {
            res.status(404).send({message: 'fix the url'})
        }

        ListService.getAll(mediaType, 1, dbRes => {
            res.status(202).send({data: dbRes});
        })
    }
}

export default ListController;
