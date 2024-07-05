const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const { auth } = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');

router.get('/', auth, admin, validate(userValidation.queryUser), userController.getUsers);
router.get('/profile', auth, userController.getUser);
router.put('/update', auth, validate(userValidation.updateUser), userController.updateUser);
router.delete('/delete', auth, userController.deleteUser);

module.exports = router;
