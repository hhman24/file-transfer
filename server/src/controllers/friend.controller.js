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

    res.status(StatusCodes.CREATED).json({
      message: 'add friend sucessfully',
      status: status,
    });
  } catch (error) {
    next(error);
  }
};

const acceptFriend = async (req, res, next) => {
  try {
    const user = req.user;
    const { friendId } = req.params;

    const existUserFriend = await userService.getOneUserById(friendId);
    if (!existUserFriend) throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found');

    const status = await friendService.acceptedFriend({
      userId: user._id.toString(),
      friendId: existUserFriend._id.toString(),
    });

    res.status(StatusCodes.OK).json({
      message: 'accepted sucessfully',
      status: { ...status, lastMessage: null },
    });
  } catch (error) {
    next(error);
  }
};

const rejectFriend = async (req, res, next) => {
  try {
    const user = req.user;
    const { friendId } = req.params;

    await friendService.rejectFriend(user._id.toString(), friendId);

    res.status(StatusCodes.OK).json({
      message: 'delete friend sucessfully',
    });
  } catch (error) {
    next(error);
  }
};

const getFriends = async (req, res, next) => {
  try {
    const user = req.user;

    const result = await friendService.getFriends(user._id.toString());

    res.status(StatusCodes.OK).json({
      friends: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserNotFriend = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await friendService.getUserNotFriend(user._id.toString());

    res.status(StatusCodes.OK).json({
      users: result,
    });
  } catch (error) {
    next(error);
  }
};

export const friendController = {
  addFriend,
  acceptFriend,
  rejectFriend,
  getFriends,
  getUserNotFriend,
};
