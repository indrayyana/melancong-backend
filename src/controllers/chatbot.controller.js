const httpStatus = require('http-status');
const { giveRecommend } = require('../models/chatbot');

const recommendation = async (req, res) => {
  try {
    const response = await giveRecommend(req.body.prompt);

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: response,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

module.exports = {
  recommendation,
};
