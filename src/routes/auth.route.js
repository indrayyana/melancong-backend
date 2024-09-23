import express from 'express';
import auth from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import * as authValidation from '../validations/auth.validation.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', validate(authValidation.userRegist), authController.register);
router.post('/login', validate(authValidation.userLogin), authController.login);
router.post('/forgot-password', validate(authValidation.userResetPassword), authController.resetPassword);
router.get('/logout', auth, authController.logout);
router.get('/token-validation', authController.tokenValidation);
router.get('/google', authController.redirectGoogleLogin);
router.get('/google-callback', authController.loginWithGoogle);

export default router;
