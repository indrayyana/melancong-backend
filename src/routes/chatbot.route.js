import express from 'express';
import auth from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import * as chatbotValidation from '../validations/chatbot.validation.js';
import * as chatbotController from '../controllers/chatbot.controller.js';

const router = express.Router();

router.post('/', auth, validate(chatbotValidation.promptChatbot), chatbotController.recommendation);

export default router;
