import express from 'express';
import ListController from '../controllers/ListController';

const router = express.Router();


router.get('/:media', ListController.showList);
router.get('/:media', ListController.showList);

router.post('/:media/insert', ListController.addToList);

export default router;
