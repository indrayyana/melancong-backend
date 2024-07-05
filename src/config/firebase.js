// Firebase
const { initializeApp } = require('firebase/app');

// Firebase-Admin
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const config = require('../utils/config');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Firebase SDK
const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
};

const app = initializeApp(firebaseConfig);

module.exports = { db, admin, app };
