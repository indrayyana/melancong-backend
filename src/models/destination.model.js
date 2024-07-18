const { db } = require('../config/firebase');
const { readSingleData } = require('../../data/loadDataset');

const readDataDestinations = async (userId, name = '') => {
  const snapshot = await db.collection('destinations').where('userId', '==', userId).get();
  let data = [];

  snapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      userId: doc.data().userId,
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
  const docRef = db.collection('destinations');

  const data = await readSingleData(destinationId);
  data.userId = userId;

  await docRef.doc(data.id).set(data);

  return data.id;
};

const deleteDestination = async (userId, destinationId) => {
  const snapshot = await db.collection('destinations')
    .where('userId', '==', userId)
    .where('id', '==', destinationId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    throw new Error('Destination not found');
  }

  const docId = snapshot.docs[0].id;
  await db.collection('destinations').doc(docId).delete();
};

module.exports = {
  saveDestination,
  readDataDestinations,
  deleteDestination,
};
