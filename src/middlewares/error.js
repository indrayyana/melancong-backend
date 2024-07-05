const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'Internal Server Error';
  }

  res.status(statusCode).send({
    status: statusCode,
    message,
  });
};

module.exports = { errorHandler };
