import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import httpStatus from 'http-status';
import * as functions from 'firebase-functions';
import config from './utils/config.js';
import logger from './config/logger.js';
import * as morgan from './config/morgan.js';
import routes from './routes/index.js';
import ApiError from './utils/ApiError.js';
import { errorHandler } from './middlewares/error.js';
import { rateLimiter } from './middlewares/rateLimiter.js';

const app = express();

// logging
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
app.use('/auth', rateLimiter);

// API routes
app.use(routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// internal server error handling
app.use(errorHandler);

const PORT = config.app.port || 3000;
app.listen(PORT, config.app.host, () => {
  logger.info(`App listening on http://${config.app.host}:${config.app.port}`);
});

// for deploy to firebase functions
// export const api = functions.region('asia-southeast2').https.onRequest(app);
