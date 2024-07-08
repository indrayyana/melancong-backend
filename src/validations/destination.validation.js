const Joi = require('joi');
const { createSchema } = require('.');

const queryDestination = {
  query: createSchema([
    { name: 'd', type: Joi.string() },
    { name: 'r', type: Joi.string() },
    { name: 'c', type: Joi.string() },
  ]),
  body: createSchema([]),
};

module.exports = {
  queryDestination,
};
