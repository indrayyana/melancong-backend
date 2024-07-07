const Joi = require('joi');
const { password } = require('./custom.validation');
const { createSchema } = require('.');

const userLogin = {
  query: createSchema([]), // No query allowed
  body: createSchema([
    { name: 'email', type: Joi.string().email({ tlds: true }).required() },
    { name: 'password', type: Joi.string().custom(password).required() },
  ]),
};

const userRegist = {
  query: createSchema([]),
  body: createSchema([
    { name: 'email', type: Joi.string().email({ tlds: true }).required() },
    { name: 'password', type: Joi.string().custom(password).required() },
    { name: 'name', type: Joi.string().required() },
  ]),
};

const userResetPassword = {
  query: createSchema([]),
  body: createSchema([
    { name: 'email', type: Joi.string().email({ tlds: true }).required() },
  ]),
};

module.exports = {
  userRegist,
  userLogin,
  userResetPassword,
};
