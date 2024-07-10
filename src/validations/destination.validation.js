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

const idDestination = {
  query: createSchema([]),
  body: createSchema([
    { name: 'id', type: Joi.number().min(1).max(45) },
  ]),
};

const querySaved = {
  query: createSchema([
    { name: 'd', type: Joi.string() },
  ]),
  body: createSchema([]),
};

module.exports = {
  queryDestination,
  idDestination,
  querySaved,
};
