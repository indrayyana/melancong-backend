import morgan from 'morgan';
import logger from './logger.js';

// Custom token to format response-time
morgan.token('response-time-int', function formatResponseTime(req, res) {
  return `${Math.ceil(this['response-time'](req, res))}ms`;
});

const successResponseFormat = ':method :status :url in :response-time-int';
const errorResponseFormat = ':method :status :url in :response-time-int';

export const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});
