import express from 'express';
import multer from 'multer';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import validate from '../middlewares/validate.js';
import * as userValidation from '../validations/user.validation.js';
import * as userController from '../controllers/user.controller.js';

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/', auth, admin, validate(userValidation.queryUser), userController.getUsers);
router.get('/profile', auth, userController.getUser);
router.put('/update', auth, validate(userValidation.updateUser), userController.updateUser);
router.delete('/delete', auth, userController.deleteUser);
router.post('/upload-image', auth, upload.single('image'), userController.uploadProfileImage);

export default router;
