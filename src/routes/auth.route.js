const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register', validate(authValidation.userRegist), authController.register);
router.post('/login', validate(authValidation.userLogin), authController.login);
router.post('/forgot-password', validate(authValidation.userResetPassword), authController.resetPassword);
router.get('/logout', auth, authController.logout);

module.exports = router;
