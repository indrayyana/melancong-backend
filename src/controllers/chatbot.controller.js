import httpStatus from 'http-status';
import { giveRecommend } from '../models/chatbot.js';

export const recommendation = async (req, res) => {
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
