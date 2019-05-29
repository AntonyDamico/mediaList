import express from 'express';
import ListController from '../controllers/ListController';
import middleware from '../middleware'

const router = express.Router();

router.get(
    '/:media',
    middleware.isLoggedIn,
    ListController.showList
);

router.get(
    '/:media/show',
    middleware.isLoggedIn,
    ListController.showAll
);

router.post('/:media/insert', ListController.addToList);

router.delete('/:media/delete', ListController.removeFromList);

export default router;
