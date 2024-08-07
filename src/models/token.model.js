import { db, admin } from '../config/firebase.js';

export const addToken = async (userId, token) => {
  const docRef = db.collection('tokens').doc();

  const newData = {
    token,
    userId,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await docRef.set(newData);
};

export const deleteToken = async (userId, token) => {
  const querySnapshot = await db.collection('tokens')
    .where('userId', '==', userId)
    .where('token', '==', token)
    .limit(1)
    .get();

  if (querySnapshot.empty) {
    throw new Error('token not found');
  }

  // Delete found documents
  const docId = querySnapshot.docs[0].id;
  await db.collection('tokens').doc(docId).delete();
};

export const deleteAllTokens = async (userId) => {
  const tokensRef = db.collection('tokens').where('userId', '==', userId);
  const snapshot = await tokensRef.get();

  const batch = db.batch();
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
};

export const isTokenValid = async (userId, token) => {
  const querySnapshot = await db.collection('tokens')
    .where('userId', '==', userId)
    .where('token', '==', token)
    .limit(1)
    .get();

  if (querySnapshot.empty) {
    return false;
  }

  return true;
};
