const httpStatus = require('http-status');
const {
  readAllData,
  readSingleData,
  updateData,
  deleteData,
} = require('../models/user.model');

const getUsers = async (req, res) => {
  try {
    const doc = await readAllData('users', req.query.name, req.query.page, req.query.limit);

    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Get Users Success',
      data: doc,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const doc = await readSingleData('users', req.id);

    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Get User Success',
      data: doc,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await updateData('users', req.id, req.body);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Update User Success',
      user,
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: 'User not found',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await deleteData('users', req.id);

    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Delete User Success',
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
