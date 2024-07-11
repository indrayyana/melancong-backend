const express = require('express');
const multer = require('multer');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/', auth, admin, validate(userValidation.queryUser), userController.getUsers);
router.get('/profile', auth, userController.getUser);
router.put('/update', auth, validate(userValidation.updateUser), userController.updateUser);
router.delete('/delete', auth, userController.deleteUser);
router.post('/upload-image', auth, upload.single('image'), userController.uploadProfileImage);

module.exports = router;
