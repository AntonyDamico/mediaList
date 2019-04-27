import express from 'express';
import homeController from '../controllers/HomeController';

const router = express.Router();


router.get('', homeController.homePage);


export default router;
