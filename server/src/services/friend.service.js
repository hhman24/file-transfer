/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes';
import { friendModel } from '~/models/FriendModel';
import ApiError from '~/utils/ApiError';
import { FRIEND_STATUS } from '~/utils/constants';
import { userService } from './user.service';

/**
 * @dev send a invite add friend from userId to friendId
 * @param
 * @returns {...} or null
 */
const addFriend = async ({ userId, friendId }) => {
  try {
    // check status of friend
    const reqAB = await friendModel.findOneFriendById(userId, friendId);
    if (reqAB)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `${userId} send request to ${friendId}, status: ${reqAB.status}`,
      );

    const reqBA = await friendModel.findOneFriendById(friendId, userId);
    if (reqBA)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `${userId} received request from ${friendId}, status: ${reqAB.status}`,
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

/**
 * @dev accept a invite add friend of friendId
 * @returns {...} or null
 */
const acceptedFriend = async ({ userId, friendId, enPrivateKeyA, enPrivateKeyB }) => {
  try {
    const existRelation = await friendModel.findOneFriendById(friendId, userId);
    if (!existRelation) throw new ApiError(StatusCodes.BAD_REQUEST, 'Not exist request friends');
    else if (existRelation && existRelation.status === FRIEND_STATUS.ACCEPTED) {
      throw new ApiError(StatusCodes.BAD_REQUEST, `${userId} & ${friendId} is friend`);
    }

    return await friendModel.findOneRelationUpdate(
      friendId,
      userId,
      enPrivateKeyA,
      enPrivateKeyB,
      FRIEND_STATUS.ACCEPTED,
    );
  } catch (error) {
    throw error;
  }
};

/**
 * @dev reject relation and remove all message
 * @returns
 */
const rejectFriend = async (userId, friendId) => {
  try {
    await friendModel.deleteFriend(userId, friendId);
  } catch (error) {
    throw error;
  }
};

/**
 * @dev get list friend inject last message and detail info friend
 * @returns array
 */
const getFriends = async (user) => {
  try {
    const friends = await friendModel.findFriendsWithLastMessage(user);

    const res = friends.map((f) => {
      f.friend = f.userA._id.toString() === user ? f.userB : f.userA;

      f.userA = f.userA._id; // _id
      f.userB = f.userB._id; // _id
      return f;
    });

    return res;
  } catch (error) {
    throw error;
  }
};

/**
 * @dev get all user not friend with status
 * @param userId: string
 * @returns array
 */
const getUserNotFriend = async (userId) => {
  try {
    const users = await userService.getAll();

    const friends = await friendModel.findAllFriends(userId);

    // filter friend with accpeted
    const acceptedfriends = friends
      .filter((f) => f.status === FRIEND_STATUS.ACCEPTED)
      .map((f) =>
        f.userA.toString() === userId.toString() ? f.userB.toString() : f.userA.toString(),
      );

    // filter friend with pending
    const pendingFriends = friends.filter((f) => f.status === FRIEND_STATUS.PENDING);
    // .map((f) =>
    //   f.userA.toString() === userId.toString() ? f.userB.toString() : f.userA.toString(),
    // );

    // filter user not in accpeted list and not user id
    const res = users
      .filter(
        (u) =>
          !acceptedfriends.includes(u._id.toString()) && u._id.toString() !== userId.toString(),
      )
      .map((u) => {
        const status = pendingFriends.find(
          (p) => p.userA.toString() === u._id.toString() || p.userB.toString() === u._id.toString(),
        );
        return {
          ...u,
          conversation: status ? status : null,
        };
      });

    return res;
  } catch (error) {
    throw error;
  }
};

const findContactById = async (id, user) => {
  try {
    const friends = await friendModel.findFriendsWithLastMessage(user);

    const res = friends
      .map((f) => {
        f.friend = f.userA._id.toString() === user ? f.userB : f.userA;

        f.userA = f.userA._id; // _id
        f.userB = f.userB._id; // _id
        return f;
      })
      .find((r) => r._id.toString() === id.toString());

    return res;
  } catch (error) {
    throw error;
  }
};

const findConversation = async (id) => {
  try {
    return await friendModel.findOneById(id);
  } catch (error) {
    throw error;
  }
};

export const friendService = {
  addFriend,
  acceptedFriend,
  rejectFriend,
  getFriends,
  getUserNotFriend,
  findContactById,
  findConversation,
};
