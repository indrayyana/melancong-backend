const httpStatus = require('http-status');
const { destinationModel } = require('../models');
const {
  readDataset,
  readSingleData,
} = require('../../data/loadDataset');

const getDataset = async (req, res) => {
  try {
    const data = await readDataset(req.query.d, req.query.r, req.query.c);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Get Destinations Success',
      data: data.data,
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

const getDetailDataset = async (req, res) => {
  try {
    const data = await readSingleData(parseInt(req.params.dataId, 10));

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Get Detail Destination Success',
      data,
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

const getDestinations = async (req, res) => {
  try {
    const data = await destinationModel.readDataDestinations(req.id, req.query.d);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Get Destinations Success',
      data,
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

const saveDestinationToFavorite = async (req, res) => {
  try {
    const data = await destinationModel.saveDestination(req.id, req.body.id);

    return res.status(httpStatus.CREATED).send({
      status: httpStatus.CREATED,
      message: 'Destination Saved Successfully',
      data,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'An error occurred while saving the destination',
    });
  }
};

const deleteSavedDestination = async (req, res) => {
  try {
    await destinationModel.deleteDestination(req.id, req.body.id.toString());

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Delete Destination Success',
    });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

module.exports = {
  getDataset,
  getDetailDataset,
  getDestinations,
  saveDestinationToFavorite,
  deleteSavedDestination,
};
