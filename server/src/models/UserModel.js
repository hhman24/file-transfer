/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi';
import { ObjectId } from 'mongodb';
// import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/patternValidator';
import { GET_DB } from '~/config/mongodb';

const USER_COLLECTION_NAME = 'users';
const USER_COLLECTION_SCHEMA = Joi.object({
  //   _id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  username: Joi.string().email().required().trim().strict(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).trim().strict(),

  //   access_token: [Joi.string(), Joi.number()],

  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
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

const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      });
  } catch (error) {
    throw new Error(error);
  }
};

const findOneByUsername = async (user) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      username: user
    });
  } catch (error) {
    throw new Error(error);
  }
};

const get_all_users = async () => {
  try {
    //get all id and username only from users (check properties _destroy = false)
    return await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .find({
        _destroy: false
      })
      .project({
        _id: 1,
        username: 1
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
          _id: new ObjectId(id)
        },
        {
          $set: {
            _destroy: true
          }
        }
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
  findOneByUsername,
  removeModel
};
