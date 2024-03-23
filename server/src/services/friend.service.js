/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes';
import { friendModel } from '~/models/FriendModel';
import ApiError from '~/utils/ApiError';

/**
 * @dev send a invite add friend to friendId by Id
 * @returns {...} or null
 */
const addFriend = async ({ userId, friendId }) => {
  try {
    // check status of friend
    const reqAB = await friendModel.findOneFriendById(userId, friendId);
    if (reqAB)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `${userId} have sent request to ${friendId}, status: ${reqAB.status}`,
      );

    const reqBA = await friendModel.findOneFriendById(friendId, userId);
    if (reqBA)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `${friendId} have sent request to ${userId}, status: ${reqAB.status}`,
      );

    const res = await friendModel.saveModel({
      userA: userId.toString(),
      userB: friendId.toString(),
    });
    return await friendModel.findOneById(res.insertedId);
  } catch (error) {
    throw error;
  }
};

export const friendService = {
  addFriend,
};
