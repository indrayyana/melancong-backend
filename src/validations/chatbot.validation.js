const Joi = require('joi');
const { createSchema } = require('.');

const promptChatbot = {
  query: createSchema([]),
  body: createSchema([
    { name: 'prompt', type: Joi.string().required() },
  ]),
};

module.exports = {
  promptChatbot,
};
