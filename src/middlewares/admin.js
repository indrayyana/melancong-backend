const httpStatus = require('http-status');
const { readSingleData } = require('../models/user.model');

/* eslint-disable arrow-body-style */
const admin = async (req, res, next) => {
  const user = await readSingleData('users', req.id);

  if (user.role !== 'admin') {
    return res.status(httpStatus.FORBIDDEN).send({
      status: httpStatus.FORBIDDEN,
      message: 'You don\'t have permission to access this resource',
    });
  }

  return next();
};

module.exports = { admin };
