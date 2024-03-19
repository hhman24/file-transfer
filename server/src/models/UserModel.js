import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/patternValidator';
import { GET_DB } from '~/config/mongodb';

const USER_COLLECTION_NAME = 'users';
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().email().required().trim().strict(),
  password: Joi.string().strict(),

  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  friends: Joi.array()
    .items(Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  _destroy: Joi.boolean().default(false),
  //   access_token: [Joi.string(), Joi.number()],
  // enums
  // type: Joi.string().valid('public', 'private').required();
});

const validateSchema = async (schema) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(schema, { abortEarly: false });
};

const saveModel = async (data) => {
  try {
    const validatedSchema = await validateSchema(data);

    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validatedSchema);
  } catch (error) {
    throw new Error(error);
  }
};

// Find user by id
const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailsUser = async (id) => {
  try {
    return await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false,
          },
        },
        {},
        {},
      ]);
  } catch (error) {
    throw new Error(error);
  }
};

// Find user by email
const findOneByEmail = async (email) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      email: email,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// get all user
const get_all_users = async () => {
  try {
    //get all id and username only from users (check properties _destroy = false)
    return await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .find({
        _destroy: false,
      })
      .project({
        _id: 1,
        username: 1,
      })
      .toArray();
  } catch (error) {
    throw new Error(error);
  }
};

//remove yourself
const removeModel = async (id) => {
  try {
    return await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            _destroy: true,
          },
        },
      );
  } catch (error) {
    throw new Error(error);
  }
};

export const UserModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  saveModel,
  findOneById,
  get_all_users,
  findOneByEmail,
  removeModel,
  getDetailsUser,
};
