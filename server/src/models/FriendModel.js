import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';
import { FRIEND_STATUS } from '~/utils/constants';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/patternValidator';
import { messageModel } from './MessageModel';
import { UserModel } from './UserModel';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

const FRIEND_COLLECTION_NAME = 'Friends';
const FRIEND_COLLECTION_SCHEMA = Joi.object({
  userA: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  userB: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  enPrivateKeyA: Joi.string().strict().default(''),
  enPrivateKeyB: Joi.string().strict().default(''),
  status: Joi.string()
    .valid(...Object.values(FRIEND_STATUS))
    .default(FRIEND_STATUS.PENDING),
  createAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(null),
});

const validateSchema = async (schema) => {
  return await FRIEND_COLLECTION_SCHEMA.validateAsync(schema, { abortEarly: false });
};

const saveModel = async (data) => {
  try {
    const validatedSchema = await validateSchema(data);

    const newObj = {
      ...validatedSchema,
      userA: new ObjectId(validatedSchema.userA),
      userB: new ObjectId(validatedSchema.userB),
    };

    return await GET_DB().collection(FRIEND_COLLECTION_NAME).insertOne(newObj);
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(FRIEND_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
  } catch (error) {
    throw new Error(error);
  }
};

const findOneFriendById = async (userA, userB) => {
  try {
    return await GET_DB()
      .collection(FRIEND_COLLECTION_NAME)
      .findOne({
        userA: new ObjectId(userA),
        userB: new ObjectId(userB),
      });
  } catch (error) {
    throw new Error(error);
  }
};

const findOneRelationUpdate = async (userA, userB, status) => {
  try {
    const res = await GET_DB()
      .collection(FRIEND_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          userA: new ObjectId(userA),
          userB: new ObjectId(userB),
          status: FRIEND_STATUS.PENDING,
        },
        {
          $set: {
            status: status,
            updatedAt: new Date(),
          },
        },
        { returnDocument: 'after' },
      );

    console.log(res);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const findFriendsWithLastMessage = async (user) => {
  try {
    const res = await GET_DB()
      .collection(FRIEND_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            $or: [
              { userA: new ObjectId(user), status: FRIEND_STATUS.ACCEPTED },
              { userB: new ObjectId(user), status: FRIEND_STATUS.ACCEPTED },
            ],
          },
        },
        {
          $lookup: {
            from: messageModel.MESSAGE_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'contact',
            pipeline: [
              {
                $sort: { createdAt: -1 },
              },
              {
                $limit: 1,
              },
            ],
            as: 'lastMessage',
          },
        },
        {
          $lookup: {
            from: UserModel.USER_COLLECTION_NAME,
            localField: 'userA',
            foreignField: '_id',
            pipeline: [
              {
                $project: { password: 0 },
              },
            ],
            as: 'userA',
          },
        },
        {
          $lookup: {
            from: UserModel.USER_COLLECTION_NAME,
            localField: 'userB',
            foreignField: '_id',
            pipeline: [
              {
                $project: { password: 0 },
              },
            ],
            as: 'userB',
          },
        },
        {
          $addFields: {
            lastMessage: {
              $cond: {
                if: { $eq: [{ $size: '$lastMessage' }, 0] },
                then: null,
                else: { $arrayElemAt: ['$lastMessage', 0] },
              },
            },
            userA: { $arrayElemAt: ['$userA', 0] },
            userB: { $arrayElemAt: ['$userB', 0] },
          },
        },
        {
          $sort: { 'lastMessage.createdAt': -1 }, // Sắp xếp theo createAt tăng dần
        },
      ])
      .toArray();
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const findAllFriends = async (userId) => {
  try {
    return await GET_DB()
      .collection(FRIEND_COLLECTION_NAME)
      .find({
        $or: [{ userA: new ObjectId(userId) }, { userB: new ObjectId(userId) }],
      })
      .toArray();
  } catch (error) {
    throw new Error(error);
  }
};

const deleteFriend = async (userId, friendId) => {
  try {
    const relation = await GET_DB()
      .collection(FRIEND_COLLECTION_NAME)
      .findOne({
        $or: [
          { userA: new ObjectId(userId), userB: new ObjectId(friendId) },
          { userA: new ObjectId(friendId), userB: new ObjectId(userId) },
        ],
      });
    if (!relation) throw new ApiError(StatusCodes.NOT_FOUND, 'not found friend');

    if (relation.status === FRIEND_STATUS.ACCEPTED) {
      await GET_DB().collection(messageModel.MESSAGE_COLLECTION_NAME).deleteMany({
        contact: relation._id,
      });
    }

    await GET_DB().collection(FRIEND_COLLECTION_NAME).deleteOne({ _id: relation._id });
  } catch (error) {
    throw new Error(error);
  }
};

export const friendModel = {
  FRIEND_COLLECTION_NAME,
  FRIEND_COLLECTION_SCHEMA,
  saveModel,
  findOneById,
  findOneFriendById,
  findOneRelationUpdate,
  findFriendsWithLastMessage,
  findAllFriends,
  deleteFriend,
};
