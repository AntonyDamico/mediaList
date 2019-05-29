import express from 'express';
import MediaController from '../controllers/MediaController';
import middleware from '../middleware'

const router = express.Router();

router.get('/:media', middleware.isLoggedIn, MediaController.getAll);
router.get('/:media/:id', middleware.isLoggedIn, MediaController.getMedia);

export default router;
