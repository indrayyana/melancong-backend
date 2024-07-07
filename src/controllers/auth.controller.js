const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const { tokenModel, userModel, authModel } = require('../models');

const signToken = async (id, name, email, emailVerified) => {
  const token = jwt.sign({
    id, name, email, emailVerified,
  }, config.jwt.secret, { expiresIn: config.jwt.expired });

  await tokenModel.addToken(id, token);

  return token;
};

const register = async (req, res) => {
  try {
    const userExist = await userModel.findDataByEmail(req.body.email);

    if (userExist) {
      return res.status(httpStatus.CONFLICT).send({
        status: httpStatus.CONFLICT,
        message: 'Email already in use',
      });
    }

    const user = await authModel.userRegister(req.body);

    return res.status(httpStatus.CREATED).send({
      status: httpStatus.CREATED,
      message: 'Registration Successfully, please check your email for a link to verify your account',
      data: {
        name: user.displayName,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await authModel.userLogin(req.body);
    const userExist = await userModel.findDataByEmail(req.body.email);

    if (!userExist) {
      const saveUser = {
        name: user.displayName,
        email: user.email,
      };

      // Simpan user ke Firestore DB
      await userModel.createData('users', saveUser, user.uid);
    }

    const token = await signToken(user.uid, user.displayName, user.email, user.emailVerified);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Login Successfully',
      data: {
        name: user.displayName,
        emailVerified: user.emailVerified,
        token,
      },
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    await authModel.userLogout(req.id, req.token);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Logout Successfully',
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const userExist = await userModel.findDataByEmail(req.body.email);

    if (!userExist) {
      return res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.NOT_FOUND,
        message: 'No user found with this email',
      });
    }

    await authModel.userResetPassword(req.body.email);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'A password reset link has been sent to your email address',
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  resetPassword,
};
