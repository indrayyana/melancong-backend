require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./src/utils/config');
const { authLimiter } = require('./src/middlewares/rateLimiter');
const routes = require('./src/routes/index');
const { errorHandler } = require('./src/middlewares/error');
const ApiError = require('./src/utils/ApiError');

const app = express();

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
app.use('/auth', authLimiter);

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
  console.log(`App listening on http://${config.app.host}:${config.app.port}`);
});
