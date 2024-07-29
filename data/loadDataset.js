/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */

import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import logger from '../src/config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let results = [];

const loadDataset = async () => {
  return new Promise((resolve, reject) => {
    const newResults = [];
    const datasetPath = path.resolve(__dirname, 'dataset.csv');
    fs.createReadStream(datasetPath)
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
    logger.info('CSV file successfully processed');
  } catch (error) {
    logger.error('Error loading initial dataset:', error);
  }
})();

export const readDataset = async (name, regency, category) => {
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

export const readSingleData = async (id) => {
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
