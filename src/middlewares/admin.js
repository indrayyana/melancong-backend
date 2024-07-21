import httpStatus from 'http-status';
import { readSingleData } from '../models/user.model.js';

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

export default admin;
