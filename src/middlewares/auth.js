const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const { readSingleData } = require('../models/user.model');
const { isTokenValid } = require('../models/token.model');

const sendUnauthorizedResponse = (res, message) => {
  res.status(httpStatus.UNAUTHORIZED).send({
    status: httpStatus.UNAUTHORIZED,
    message,
  });
};

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return sendUnauthorizedResponse(res, 'Please login first');
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, config.jwt.secret);
    const valid = await isTokenValid(decoded.id, token);

    if (!valid) {
      return sendUnauthorizedResponse(res, 'Please login (invalid token)');
    }

    if (!decoded.emailVerified) {
      return sendUnauthorizedResponse(res, 'Please verify your email before accessing this resource');
    }

    const currentUser = await readSingleData('users', decoded.id);

    if (!currentUser) {
      return sendUnauthorizedResponse(res, 'User has been deleted');
    }

    // user id, email, token
    req.id = decoded.id;
    req.email = decoded.email;
    req.token = token;

    return next();
  } catch (error) {
    return sendUnauthorizedResponse(res, 'Invalid token');
  }
};

module.exports = { auth };
