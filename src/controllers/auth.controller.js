const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { createData, findDataByEmail } = require('../models/user.model');
const config = require('../utils/config');
const { addToken } = require('../models/token.model');
const {
  userRegister,
  userLogin,
  userLogout,
  userResetPassword,
} = require('../models/auth.model');

const signToken = async (id, name, email, emailVerified) => {
  const token = jwt.sign({
    id, name, email, emailVerified,
  }, config.jwt.secret, { expiresIn: config.jwt.expired });

  await addToken(id, token);

  return token;
};

const register = async (req, res) => {
  try {
    const userExist = await findDataByEmail(req.body.email);

    if (userExist) {
      return res.status(httpStatus.CONFLICT).send({
        status: httpStatus.CONFLICT,
        message: 'Email already in use',
      });
    }

    const user = await userRegister(req.body);

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
    const user = await userLogin(req.body);
    const userExist = await findDataByEmail(req.body.email);

    if (!userExist) {
      const saveUser = {
        name: user.displayName,
        email: user.email,
      };

      // Simpan user ke Firestore DB
      await createData('users', saveUser, user.uid);
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
    await userLogout(req.id, req.token);

    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Logout Successfully',
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    await userResetPassword(req.email);

    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'A password reset link has been sent to your email address',
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({
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
