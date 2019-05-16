import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);

export default router;
