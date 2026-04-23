import express from 'express';
import { logInHandler, signUpHandler } from '../controllers/authController.js';
import { validateLogIn, validateSignUp } from '../middleware/userValidators.js';

const router = express.Router();

router.post('/signup', validateSignUp, signUpHandler);
router.post('/login', validateLogIn, logInHandler);

export default router;
