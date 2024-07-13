const { v4: uuidv4 } = require('uuid');
const { db, admin } = require('../config/firebase');
const { deleteToken } = require('./token.model');

const readAllData = async (collectionName, name, page = 1, limit = 10) => {
  const snapshot = await db.collection(collectionName).get();
  let data = [];

  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  if (name) {
    /* eslint-disable dot-notation */
    data = data.filter((item) => item['name'].toLowerCase().includes(name.toLowerCase()));
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit, 10);
  const paginatedResults = data.slice(startIndex, endIndex);

  return {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    totalResults: data.length,
    totalPages: Math.ceil(data.length / limit),
    data: paginatedResults,
  };
};

const readSingleData = async (collectionName, docId) => {
  const docRef = db.collection(collectionName).doc(docId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error(`${collectionName} not found`);
  }

  return { id: doc.id, ...doc.data() };
};

const createData = async (collectionName, data, id = null) => {
  let docRef;

  if (id) {
    docRef = db.collection(collectionName).doc(id);
  } else {
    docRef = db.collection(collectionName).doc();
  }

  await docRef.set(data);

  return docRef.id;
};

const updateData = async (collectionName, docId, data) => {
  const docRef = db.collection(collectionName).doc(docId);
  await docRef.update(data);

  return data;
};

const deleteData = async (collectionName, docId) => {
  const docRef = db.collection(collectionName).doc(docId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error(`${collectionName} not found`);
  }

  // Delete user from Firestore
  await docRef.delete();

  // Delete user email from Firebase Authentication
  await admin.auth().deleteUser(docId);

  // Delete all user token
  const tokens = await db.collection('users').doc(docId).collection('tokens').get();
  tokens.forEach(async (tokenDoc) => {
    await deleteToken(docId, tokenDoc.id);
  });
};

const uploadFile = async (userId, file) => {
  const bucket = admin.storage().bucket();

  if (!file) {
    throw new Error('No file uploaded');
  }

  const validMimeTypes = [
    'image/apng',
    'image/avif',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
  ];

  if (!validMimeTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type');
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the maximum limit of 5MB');
  }

  const downloadToken = uuidv4();

  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: downloadToken,
    },
    contentType: file.mimetype,
    cacheControl: 'public, max-age=31536000',
  };

  const blob = bucket.file(userId);
  const blobStream = blob.createWriteStream({
    metadata,
    gzip: true,
  });

  return new Promise((resolve, reject) => {
    /* eslint-disable no-unused-vars */
    blobStream.on('error', (err) => {
      reject(new Error('Unable to upload image'));
    });

    blobStream.on('finish', async () => {
      try {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media&token=${downloadToken}`;

        await updateData('users', userId, {
          imageLink: imageUrl,
        });

        resolve(imageUrl);
      } catch (err) {
        reject(err);
      }
    });

    blobStream.end(file.buffer);
  });
};

const findDataByEmail = async (email) => {
  const snapshot = await db.collection('users').where('email', '==', email).get();

  if (snapshot.empty) {
    return null;
  }

  let user = null;

  snapshot.forEach((doc) => {
    user = { id: doc.id, ...doc.data() };
  });

  return user;
};

module.exports = {
  readAllData,
  readSingleData,
  createData,
  updateData,
  deleteData,
  uploadFile,
  findDataByEmail,
};
