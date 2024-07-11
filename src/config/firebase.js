// Firebase
const { initializeApp } = require('firebase/app');

// Firebase-Admin
const admin = require('firebase-admin');

const config = require('../utils/config');

const serviceAccount = {
  type: config.firebase.type,
  project_id: config.firebase.projectId,
  private_key_id: config.firebase.privateKeyId,
  private_key: config.firebase.privateKey.replace(/\\n/g, '\n'), // Mengganti \\n dengan \n
  client_email: config.firebase.clientEmail,
  client_id: config.firebase.clientId,
  auth_uri: config.firebase.authUri,
  token_uri: config.firebase.tokenUri,
  auth_provider_x509_cert_url: config.firebase.authProvider,
  client_x509_cert_url: config.firebase.clientCert,
  universe_domain: config.firebase.universeDomain,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://melanc0ng.appspot.com',
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
