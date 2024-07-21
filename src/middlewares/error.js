import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

/* eslint-disable no-unused-vars */
export const errorHandler = (err, req, res, next) => {
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
