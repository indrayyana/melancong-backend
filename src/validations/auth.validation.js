import Joi from 'joi';
import { password } from './custom.validation.js';
import { createSchema } from './index.js';

export const userLogin = {
  query: createSchema([]),
  body: createSchema([
    { name: 'email', type: Joi.string().email({ tlds: true }).required() },
    { name: 'password', type: Joi.string().custom(password).required() },
  ]),
};

export const userRegist = {
  query: createSchema([]),
  body: createSchema([
    { name: 'email', type: Joi.string().email({ tlds: true }).required() },
    { name: 'password', type: Joi.string().custom(password).required() },
    { name: 'name', type: Joi.string().required() },
  ]),
};

export const userResetPassword = {
  query: createSchema([]),
  body: createSchema([
    { name: 'email', type: Joi.string().email({ tlds: true }).required() },
  ]),
};
