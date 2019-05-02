import express from 'express';
import RatingService from '../services/RatingService';
import RatingController from '../controllers/RatingController';
import DefaultController from '../controllers/DefaultMediaController';

const router = express.Router();


router.get('/:media/rating', (req, res) => {
    DefaultController.read(req, res, RatingService)
});

router.get('/:media/rating/:id');

router.post('/:media/rating/add', RatingController.create);

router.delete('/:media/rating/delete', (req, res) => {
    DefaultController.delete(req, res, RatingService);
});

export default router;
