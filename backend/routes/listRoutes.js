import express from 'express';
import ListController from '../controllers/ListController';
import middleware from '../middleware'

const router = express.Router();


router.get(
    '/:media',
    [middleware.isValidRequest, middleware.isLoggedIn],
    ListController.showList
);

router.post('/:media/insert', ListController.addToList);

router.delete('/:media/delete', ListController.removeFromList);

export default router;
