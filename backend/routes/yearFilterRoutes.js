import express from 'express';
import YearController from '../controllers/YearFilterController';
import middleware from '../middleware'

const router = express.Router();


router.get('/year/filter', middleware.isLoggedIn, YearController.getMovies);

export default router;
