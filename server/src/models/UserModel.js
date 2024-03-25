import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';

const USER_COLLECTION_NAME = 'Users';
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().min(3).max(30).required().trim().strict(),
  email: Joi.string().email().required().trim().strict(),
  password: Joi.string().strict(),
  publicKeyCredential: Joi.string().strict().default(''),
  online: Joi.boolean().default(false),
  lastOnline: Joi.date().default(new Date()),
  createAt: Joi.date().timestamp('javascript').default(new Date()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
  // friends: Joi.array()
  //   .items(Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
  //   .default([]),
  // type: Joi.string().valid('public', 'private').required(); // enums
});

const validateSchema = async (schema) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(schema, { abortEarly: false });
};

const saveModel = async (data) => {
  try {
    const validatedSchema = await validateSchema(data);

    // biến đổi về object id
    const newObj = {
      ...validatedSchema,
      // friends: validatedSchema.friends.map((u) => new ObjectId(u)),
    };

    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(newObj);
  } catch (error) {
    throw new Error(error);
  }
};

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

const getOneUserByFilter = async (filter) => {
  try {
    const res = await GET_DB().collection(USER_COLLECTION_NAME).findOne(filter);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const getOneUserDetailsByFilter = async (filter) => {
  try {
    const res = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .aggregate([
        {
          $match: filter,
        },
        // {
        //   $lookup: {
        //     from: USER_COLLECTION_NAME,
        //     localField: 'friends',
        //     foreignField: '_id',
        //     as: 'friendsInfo',
        //   },
        // },
        {
          $project: {
            password: 0,
            // 'friendsInfo.password': 0,
          },
        },
        { $limit: 1 },
      ])
      .toArray();
    return res[0] || {};
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
        password: 0,
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
  removeModel,
  getOneUserDetailsByFilter,
  getOneUserByFilter,
};
