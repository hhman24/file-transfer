import { StatusCodes } from 'http-status-codes';
import { friendService } from '~/services/friend.service';
import { userService } from '~/services/user.service';
import ApiError from '~/utils/ApiError';

const addFriend = async (req, res, next) => {
  try {
    const user = req.user;
    const { friendId } = req.params;

    // return {...} or null
    const existUserFriend = await userService.getOneUserById(friendId);
    if (!existUserFriend) throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found');

    const status = await friendService.addFriend({
      userId: user._id,
      friendId: existUserFriend._id,
    });

    res.status(StatusCodes.OK).json({
      message: 'add friend sucessfully',
      status: status,
    });
  } catch (error) {
    next(error);
  }
};

const accessFriend = async (req, res, next) => {
  res.status(StatusCodes.OK).json({
    message: 'access friend sucessfully',
  });
  next();
};

const rejectFriend = async (req, res, next) => {
  res.status(StatusCodes.OK).json({
    message: 'deny friend sucessfully',
  });
  next();
};

export const friendController = {
  addFriend,
  accessFriend,
  rejectFriend,
};
