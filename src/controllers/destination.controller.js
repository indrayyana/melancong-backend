const httpStatus = require('http-status');
const {
  readDataset,
  readSingleData,
} = require('../../data/loadDataset');

const getDataset = async (req, res) => {
  try {
    const data = await readDataset(req.query.d, req.query.r, req.query.c);

    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Get Destinations Success',
      data: data.data,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

const getDetailDataset = async (req, res) => {
  try {
    const data = await readSingleData(parseInt(req.params.dataId, 10));

    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Get Detail Destination Success',
      data,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: error.message,
    });
  }
};

module.exports = {
  getDataset,
  getDetailDataset,
};
