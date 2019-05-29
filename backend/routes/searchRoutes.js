import express from 'express';
import SearchController from '../controllers/SearchController';
import middleware from '../middleware'

const router = express.Router();

router.get('/search', middleware.isLoggedIn, SearchController.search);


export default router;
