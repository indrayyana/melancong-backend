import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { deleteToken, deleteAllTokens } from './token.model.js';

const auth = getAuth();

export const userRegister = async (data) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    // Update profile display name
    await updateProfile(user, { displayName: data.name });

    // Send email verification
    await sendEmailVerification(user);

    return user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email already in use');
    }
    if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error - please check your connection and try again.');
    }

    throw error;
  }
};

export const userLogin = async (data) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      throw new Error('Please verify your email before login.');
    }

    await deleteAllTokens(user.uid);

    return user;
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      throw new Error('Incorrect email or password');
    }
    if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error - please check your connection and try again.');
    }
    if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed login attempts. Please try again later.');
    }

    throw error;
  }
};

export const userLogout = async (userId, token) => {
  await deleteToken(userId, token);
};

export const userResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error - please check your connection and try again.');
    }
    if (error.code === 'auth/user-not-found') {
      throw new Error('No user found with this email');
    }

    throw error;
  }
};
