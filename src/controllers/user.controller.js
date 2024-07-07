const httpStatus = require('http-status');
const { userModel } = require('../models');

const getUsers = async (req, res) => {
  try {
    const doc = await userModel.readAllData('users', req.query.name, req.query.page, req.query.limit);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Get Users Success',
      data: doc,
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const doc = await userModel.readSingleData('users', req.id);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Get User Success',
      data: doc,
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userModel.updateData('users', req.id, req.body);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Update User Success',
      data: user,
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
    await userModel.deleteData('users', req.id);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Delete User Success',
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({
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
