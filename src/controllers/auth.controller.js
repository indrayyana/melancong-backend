import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
import { tokenModel, userModel, authModel } from '../models/index.js';
import { authorizationUrl, oauth2Client, google } from '../config/oauth.js';

const signToken = async (id, name, email, emailVerified) => {
  const token = jwt.sign({
    id, name, email, emailVerified,
  }, config.jwt.secret, { expiresIn: config.jwt.expired });

  await tokenModel.addToken(id, token);

  return token;
};

export const register = async (req, res) => {
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

export const login = async (req, res) => {
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

export const logout = async (req, res) => {
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

export const resetPassword = async (req, res) => {
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

export const tokenValidation = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, config.jwt.secret);
    const valid = await tokenModel.isTokenValid(decoded.id, token);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      valid,
    });
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      status: httpStatus.UNAUTHORIZED,
      valid: false,
    });
  }
};

export const redirectGoogleLogin = async (req, res) => {
  return res.redirect(authorizationUrl);
};

export const loginWithGoogle = async (req, res) => {
  const { tokens } = await oauth2Client.getToken(req.query.code.toString());

  oauth2Client.setCredentials(tokens);

  const { data } = await google.oauth2({ auth: oauth2Client, version: 'v2' }).userinfo.get();

  if (!data.email || !data.name) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: 'Google login failed',
    });
  }

  let user = await userModel.findDataByEmail(data.email);
  let userId;

  if (!user) {
    const saveUser = {
      email: data.email,
      name: data.name,
    };

    userId = await userModel.createData('users', saveUser);
  } else {
    userId = user.id;
  }

  const token = await signToken(userId, data.name, data.email, data.verified_email);

  // TODO: replace this url with the link to the oauth google success page of your front-end app
  return res.redirect(`https://melancong-fe.vercel.app/google?token=${token}`)
};
