const Joi = require('joi');
const { createSchema } = require('.');

const updateUser = {
  query: createSchema([]),
  body: createSchema([
    { name: 'name', type: Joi.string() },
    { name: 'gender', type: Joi.string().valid('Male', 'Female') },
    { name: 'phone', type: Joi.string() },
  ]),
};

const queryUser = {
  query: createSchema([
    { name: 'name', type: Joi.string() },
    { name: 'limit', type: Joi.number().integer() },
    { name: 'page', type: Joi.number().integer() },
  ]),
  body: createSchema([]),
};

module.exports = {
  updateUser,
  queryUser,
};
