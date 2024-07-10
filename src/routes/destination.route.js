const express = require('express');
const validate = require('../middlewares/validate');
const destinationValidation = require('../validations/destination.validation');
const destinationController = require('../controllers/destination.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, validate(destinationValidation.queryDestination), destinationController.getDataset);
router.get('/detail/:dataId', auth, destinationController.getDetailDataset);
router.get('/saved', auth, validate(destinationValidation.querySaved), destinationController.getDestinations);
router.post('/add', auth, validate(destinationValidation.idDestination), destinationController.saveDestinationToFavorite);
router.delete('/delete', auth, validate(destinationValidation.idDestination), destinationController.deleteSavedDestination);

module.exports = router;
