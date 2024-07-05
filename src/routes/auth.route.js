const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const { auth } = require('../middlewares/auth');
const authController = require('../controllers/auth.controller');
const authValidation = require('../validations/auth.validation');

router.post('/register', validate(authValidation.userRegist), authController.register);
router.post('/login', validate(authValidation.userLogin), authController.login);
router.get('/logout', auth, authController.logout);
router.get('/password', auth, authController.resetPassword);

module.exports = router;
