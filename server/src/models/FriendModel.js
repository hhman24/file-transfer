import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';
import { FRIEND_STATUS } from '~/utils/constants';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/patternValidator';

const FRIEND_COLLECTION_NAME = 'Friends';
const FRIEND_COLLECTION_SCHEMA = Joi.object({
  userA: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  userB: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  enPubKey: Joi.string().strict().default(''),
  status: Joi.string()
    .valid(...Object.values(FRIEND_STATUS))
    .default(FRIEND_STATUS.PENDING),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
});

const validateSchema = async (schema) => {
  return await FRIEND_COLLECTION_SCHEMA.validateAsync(schema, { abortEarly: false });
};

const saveModel = async (data) => {
  try {
    console.log(data);
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

export const friendModel = {
  FRIEND_COLLECTION_NAME,
  FRIEND_COLLECTION_SCHEMA,
  saveModel,
  findOneById,
  findOneFriendById,
};
