import express from 'express';
import homeController from '../controllers/HomeController';

const router = express.Router();


router.get('', homeController.homePage);
router.get('/filter/:genreId', homeController.filterMediaByGenre);

// router.get('', (req, res) => {
//     res.send('a')
// });


export default router;
