/* eslint-disable radix */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */

const fs = require('fs');
const csv = require('csv-parser');

let results = [];

const loadDataset = async () => {
  return new Promise((resolve, reject) => {
    const newResults = [];
    fs.createReadStream('./data/dataset.csv')
      .pipe(csv())
      .on('data', (data) => newResults.push(data))
      .on('end', () => {
        // Update the global results array with new data
        results = newResults;
        resolve();
      })
      .on('error', reject);
  });
};

// Initial dataset loading
(async () => {
  try {
    await loadDataset();
    console.log('CSV file successfully processed');
  } catch (error) {
    console.error('Error loading initial dataset:', error);
  }
})();

const readDataset = async (name, regency, category) => {
  // Check if dataset is already loaded
  if (results.length === 0) {
    await loadDataset();
  }

  let filteredResults = results;

  if (name) {
    filteredResults = filteredResults.filter((item) => item['Destination Name'].toLowerCase().includes(name.toLowerCase()));
  }

  if (regency) {
    filteredResults = filteredResults.filter((item) => item['Regency'].toLowerCase().includes(regency.toLowerCase()));
  }

  if (category) {
    filteredResults = filteredResults.filter((item) => item['Category'].toLowerCase().includes(category.toLowerCase()));
  }

  const formattedData = filteredResults.map((item, index) => ({
    id: item['No'],
    name: item['Destination Name'],
    regency: item['Regency'],
    category: item['Category'],
    rating: item['Rating'],
    location: item['Location'],
    childEntry: item['Child Entry'],
    adultsEntry: item['Adults Entry'],
    imageLink: item['Image Link'],
    information: item['Information'],
  }));

  return {
    data: formattedData,
  };
};

const readSingleData = async (id) => {
  if (results.length === 0) {
    await loadDataset();
  }

  const item = results.find((_, index) => index + 1 === id);

  if (!item) {
    throw new Error(`Item with id ${id} not found`);
  }

  return {
    id: item['No'],
    name: item['Destination Name'],
    regency: item['Regency'],
    category: item['Category'],
    rating: item['Rating'],
    location: item['Location'],
    childEntry: item['Child Entry'],
    adultsEntry: item['Adults Entry'],
    imageLink: item['Image Link'],
    information: item['Information'],
  };
};

module.exports = {
  readDataset,
  readSingleData,
};
