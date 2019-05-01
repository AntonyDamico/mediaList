import express from 'express';
import FavoritesController from '../controllers/FavoritesController';

const router = express.Router();


router.get('/:media/favorites', FavoritesController.getFavorites);
router.post('/:media/favorites/add', FavoritesController.addToFavorites);
router.delete('/:media/favorites/delete', FavoritesController.removeFromFavorites);

export default router;
