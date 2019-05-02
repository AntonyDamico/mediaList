import Responses from '../core/Responses'
import DefaultMediaController from './DefaultMediaController';
import RatingService from '../services/RatingService';

class RatingController {

    static async create(req, res) {
        DefaultMediaController.checkValidReq(req, res);

        const data = await RatingService.insert(
            req.params.media,
            1,
            req.body.media_id,
            req.body.rating
        ).catch(err => Responses.failed(res, err));

        Responses.successful(res, data)
    }
}

export default RatingController;
