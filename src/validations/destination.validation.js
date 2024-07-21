import Joi from 'joi';
import { createSchema } from './index.js';

export const queryDestination = {
  query: createSchema([
    { name: 'd', type: Joi.string() },
    { name: 'r', type: Joi.string() },
    { name: 'c', type: Joi.string() },
  ]),
  body: createSchema([]),
};

export const idDestination = {
  query: createSchema([]),
  body: createSchema([
    { name: 'id', type: Joi.number().min(1).max(45) },
  ]),
};

export const querySaved = {
  query: createSchema([
    { name: 'd', type: Joi.string() },
  ]),
  body: createSchema([]),
};
