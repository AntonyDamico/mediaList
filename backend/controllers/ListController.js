import ListService from '../services/ListService';

class ListController {

    static async showList(req, res) {
        if (!ListController.isValidReq(req))
            res.status(404).send({message: 'fix the url'});

        const mediaType = req.params.media;
        const data = await ListService.getAll(mediaType, 1)
            .catch(error => {
                console.log(error);
                res.status(404).send({message: 'Something went wrong'})
            });
        res.status(200).send({data})
    }

    static async addToList(req, res) {
        if (!ListController.isValidReq(req))
            res.status(404).send({message: 'fix the url'});

        await ListService.insert(
            req.params.media,
            1,
            req.body.media_id
        ).catch(error => {
            console.log(error);
            res.status(404).send({message: 'Something went wrong'})
        });

        res.status(200).send({message: `Object added to list`});
    }

    static async removeFromList(req, res) {
        if (!ListController.isValidReq(req))
            res.status(404).send({message: 'fix the url'});

        await ListService.delete(
            req.params.media,
            1,
            req.body.media_id
        ).catch(error => {
            console.log(error);
            res.status(404).send({message: 'Something went wrong'})
        });
        res.status(200).send({message: `Object removed from list`});
    }


    static isValidReq(req) {
        return ['movie', 'show'].includes(req.params.media)
    }
}

export default ListController;
