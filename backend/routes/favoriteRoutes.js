import express from 'express';
import FavoritesController from '../controllers/FavoritesController';

const router = express.Router();


router.get('/:media/favorites', FavoritesController.getAll);
router.post('/:media/favorites/add', FavoritesController.add);
router.delete('/:media/favorites/delete', FavoritesController.remove);

export default router;
