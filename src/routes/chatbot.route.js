const express = require('express');
const validate = require('../middlewares/validate');
const chatbotValidation = require('../validations/chatbot.validation');
const chatbotController = require('../controllers/chatbot.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/chatbot', auth, validate(chatbotValidation.promptChatbot), chatbotController.recommendation);

module.exports = router;
