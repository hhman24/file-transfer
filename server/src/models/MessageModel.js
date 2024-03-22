import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/patternValidator';
import { GET_DB } from '~/config/mongodb';

const USER_COLLECTION_NAME = 'Message';
const USER_COLLECTION_SCHEMA = Joi.object({
  //   _id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  sender: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  receiver : Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  content: Joi.string(),
  timestamp: Joi.date().timestamp('javascript').default(Date.now),
  _unread: Joi.boolean().default(false)
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
const findById = async (id,startIndex,limit) => {
    try {
      return await GET_DB()
        .collection(USER_COLLECTION_NAME)
        .find(
          {receiver : new ObjectId(id)}).limit(limit).skip(startIndex).toArray()
    } catch (error) { 
      throw new Error(error);
    }
  };
const countAmount = async () => {
  try {
    //get all id and username only from users (check properties _destroy = false)
    return await GET_DB()
      .collection(USER_COLLECTION_NAME).countDocuments()
      
  } catch (error) {
    throw new Error(error);
  }
};
export const MsgModel = {
    USER_COLLECTION_NAME,
    USER_COLLECTION_SCHEMA,
    saveModel,
    findById,
    countAmount
  };
  