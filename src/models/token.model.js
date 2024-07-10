const { db, admin } = require('../config/firebase');

const addToken = async (docId, token) => {
  const docRef = db.collection('users').doc(docId).collection('tokens');
  const newDocRef = docRef.doc(token);

  const newData = {
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await newDocRef.set(newData);
};

const deleteToken = async (docId, token) => {
  const docRef = db.collection('users').doc(docId).collection('tokens').doc(token);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error('token not found');
  }

  await docRef.delete();
};

const deleteAllTokens = async (docId) => {
  const tokensRef = db.collection('users').doc(docId).collection('tokens');
  const snapshot = await tokensRef.get();

  const batch = db.batch();
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
};

const isTokenValid = async (docId, token) => {
  const docRef = db.collection('users').doc(docId).collection('tokens').doc(token);
  const doc = await docRef.get();

  return doc.exists;
};

module.exports = {
  addToken,
  deleteToken,
  deleteAllTokens,
  isTokenValid,
};
