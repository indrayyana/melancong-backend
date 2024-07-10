const Joi = require('joi');

// Objek pesan kesalahan default
const defaultMessages = (label) => ({
  'string.base': `${label} harus berupa teks`,
  'string.empty': `${label} tidak boleh kosong`,
  'any.required': `Field ${label} harus diisi`,
  'number.base': `${label} harus berupa angka`,
  'number.positive': `${label} harus berupa angka positif`,
  'string.email': `${label} tidak valid`,
  'string.min': `${label} harus memiliki panjang minimal {#limit} karakter`,
  'string.max': `${label} harus memiliki panjang maksimal {#limit} karakter`,
  'number.min': `${label} harus lebih besar dari atau sama dengan {#limit}`,
  'number.max': `${label} harus lebih kecil dari atau sama dengan {#limit}`,
  'any.only': `${label} tidak valid`,
  'any.unknown': `${label} tidak diizinkan`, // bug
});

const createSchema = (properties) => Joi.object().keys(
  Object.fromEntries(properties.map(({ name, type }) => [
    name, type.messages(defaultMessages(name)),
  ])),
);

module.exports = { createSchema };
