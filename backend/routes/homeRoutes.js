import express from 'express';
import homeController from '../controllers/HomeController';
import middleware from '../middleware'

const router = express.Router();


router.get('', middleware.isLoggedIn, homeController.homePage);
router.get('/filter/:genreId', homeController.filterMediaByGenre);

// router.get('', (req, res) => {
//     res.send('a')
// });


export default router;
