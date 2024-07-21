import httpStatus from 'http-status';
import { userModel } from '../models/index.js';

export const getUsers = async (req, res) => {
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

export const getUser = async (req, res) => {
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

export const updateUser = async (req, res) => {
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

export const deleteUser = async (req, res) => {
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

export const uploadProfileImage = async (req, res) => {
  try {
    const imageUrl = await userModel.uploadFile(req.id, req.file);

    return res.status(httpStatus.CREATED).send({
      status: httpStatus.CREATED,
      message: 'Upload file successfully',
      data: imageUrl,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};
