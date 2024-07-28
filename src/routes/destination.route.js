import express from 'express';
import auth from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import * as destinationValidation from '../validations/destination.validation.js';
import * as destinationController from '../controllers/destination.controller.js';

const router = express.Router();

router.get('/', validate(destinationValidation.queryDestination), destinationController.getDataset);
router.get('/detail/:dataId', auth, destinationController.getDetailDataset);
router.get('/saved', auth, validate(destinationValidation.querySaved), destinationController.getDestinations);
router.post('/add', auth, validate(destinationValidation.idDestination), destinationController.saveDestinationToFavorite);
router.delete('/delete', auth, validate(destinationValidation.idDestination), destinationController.deleteSavedDestination);

export default router;
