import express from 'express';
import movieDbController from '../controllers/MovieDbController';

const router = express.Router();


router.get('/moviedb/search', movieDbController.searchMovie);


export default router;
