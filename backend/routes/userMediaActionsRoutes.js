import express from 'express';
import UserMediaActionsController from '../controllers/UserMediaActionsController';

const router = express.Router();


router.get('/:media/favorites', UserMediaActionsController.getFavorites);

export default router;
