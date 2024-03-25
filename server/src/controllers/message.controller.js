import { StatusCodes } from 'http-status-codes';
import { messageService } from '~/services/message.service';

const getMsgById = async (req, res, next) => {
  try {
    const result = await messageService.getMsgById(req);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const sendMsg = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json({
      message: 'send successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const messageController = {
  getMsgById,
  sendMsg,
};
