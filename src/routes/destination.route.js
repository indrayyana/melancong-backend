const express = require('express');
const validate = require('../middlewares/validate');
const destinationValidation = require('../validations/destination.validation');
const destinationController = require('../controllers/destination.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, validate(destinationValidation.queryDestination), destinationController.getDataset);
router.get('/detail/:dataId', auth, destinationController.getDetailDataset);

module.exports = router;
