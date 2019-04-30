import express from 'express';
import UserMediaActionsController from '../controllers/UserMediaActionsController';

const router = express.Router();


router.get('/:media/favorites', UserMediaActionsController.getFavorites);
router.post('/:media/favorites/add', UserMediaActionsController.addToFavorites);

export default router;
