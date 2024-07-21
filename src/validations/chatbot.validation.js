import Joi from 'joi';
import { createSchema } from './index.js';

export const promptChatbot = {
  query: createSchema([]),
  body: createSchema([
    { name: 'prompt', type: Joi.string().required() },
  ]),
};
