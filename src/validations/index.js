import Joi from 'joi';

const defaultMessages = (label) => ({
  'string.base': `${label} must be text`,
  'string.empty': `${label} can not be empty`,
  'any.required': `Field ${label} must be filled`,
  'number.base': `${label} must be a number`,
  'number.positive': `${label} must be a positive number`,
  'string.email': `invalid ${label}`,
  'string.min': `${label} must have a minimum length of {#limit} characters`,
  'string.max': `${label} must have a maximum length of {#limit} characters`,
  'number.min': `${label} must be greater than or equal to {#limit}`,
  'number.max': `${label} must be less than or equal to {#limit}`,
  'any.only': `invalid ${label}`,
  'any.unknown': `${label} is not allowed`, // bug
});

export const createSchema = (properties) => Joi.object().keys(
  Object.fromEntries(properties.map(({ name, type }) => [
    name, type.messages(defaultMessages(name)),
  ])),
);
