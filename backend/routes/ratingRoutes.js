import express from 'express';
import RatingService from '../services/RatingService';
import RatingController from '../controllers/RatingController';
import DefaultController from '../controllers/DefaultMediaController';
import middleware from '../middleware'

const router = express.Router();

router.get('/rating/filter', middleware.isLoggedIn, RatingController.filterByRating);


router.get('/:media/rating', (req, res) => {
    DefaultController.read(req, res, RatingService)
});

router.get('/:media/rating/:id', (req, res) => {
    DefaultController.getById(req, res, RatingService)
});

router.post('/:media/rating/add', RatingController.create);

router.delete('/:media/rating/delete', (req, res) => {
    DefaultController.delete(req, res, RatingService);
});


export default router;
