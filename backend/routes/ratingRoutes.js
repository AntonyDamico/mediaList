import express from 'express';

const router = express.Router();


router.get('/:media/rating', (req, res) => res.send('hello from rating'));
router.get('/:media/rating/:id');
router.post('/:media/rating/add');
router.delete('/:media/rating/delete');

export default router;
