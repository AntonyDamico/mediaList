import express from 'express';
import MediaController from '../controllers/MediaController';

const router = express.Router();

router.get('/:media', MediaController.getAll);

export default router;