const { db } = require('../config/firebase');
const { readSingleData } = require('../../data/loadDataset');

const readDataDestinations = async (docId, name = '') => {
  const snapshot = await db.collection('users').doc(docId).collection('destinations').get();
  let data = [];

  snapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      name: doc.data().name,
      regency: doc.data().regency,
      category: doc.data().category,
      rating: doc.data().rating,
      location: doc.data().location,
      childEntry: doc.data().childEntry,
      adultsEntry: doc.data().adultsEntry,
      imageLink: doc.data().imageLink,
      information: doc.data().information,
    });
  });

  if (name) {
    /* eslint-disable dot-notation */
    data = data.filter((item) => item['name'].toLowerCase().includes(name.toLowerCase()));
  }

  return data;
};

const saveDestination = async (userId, destinationId) => {
  const docRef = db.collection('users').doc(userId).collection('destinations');

  const data = await readSingleData(destinationId);
  await docRef.doc(data.id).set(data);

  return data.id;
};

const deleteDestination = async (userId, destinationId) => {
  const docRef = db.collection('users').doc(userId).collection('destinations').doc(destinationId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error('Destination not found');
  }

  await docRef.delete();
};

module.exports = {
  saveDestination,
  readDataDestinations,
  deleteDestination,
};
