import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();


router.get('/login', AuthController.loginPage);

export default router;
