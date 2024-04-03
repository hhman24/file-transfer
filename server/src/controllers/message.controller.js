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
    const userId = req.user._id.toString();
    const friendId = req.params.friendId;

    const existContact = await friendService.findConversation(req.body.conversation);

    if (!existContact) throw new ApiError(StatusCodes.BAD_REQUEST, 'Not found contact');

    if (
      (existContact.userA.toString() === userId && existContact.userB.toString() === friendId) ||
      (existContact.userA.toString() === friendId && existContact.userB.toString() === userId)
    ) {
      const msg = await messageService.sendMsg({ ...req.body, sendById: userId });
      res.status(StatusCodes.CREATED).json({
        message: 'send successfully',
        newMessage: msg,
      });
    } else {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Not your friend');
    }
  } catch (error) {
    next(error);
  }
};

export const messageController = {
  getMsgById,
  sendMsg,
};
