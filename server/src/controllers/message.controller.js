import { StatusCodes } from 'http-status-codes';
import { friendService } from '~/services/friend.service';
import { messageService } from '~/services/message.service';
import ApiError from '~/utils/ApiError';

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
    const data = { ...req.body, sendById: req.user._id.toString() };

    const existContact = await friendService.findContactById(data.contact);
    if (!existContact) throw new ApiError(StatusCodes.BAD_REQUEST, 'Not found contact');

    const msg = await messageService.sendMsg(data);
    res.status(StatusCodes.CREATED).json({
      message: 'send successfully',
      newMessage: msg,
    });
  } catch (error) {
    next(error);
  }
};

export const messageController = {
  getMsgById,
  sendMsg,
};
