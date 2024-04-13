import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/patternValidator';
import { GET_DB } from '~/config/mongodb';

const MESSAGE_COLLECTION_NAME = 'Messages';
const MESSAGE_COLLECTION_SCHEMA = Joi.object({
  conversation: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  sendById: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  content: Joi.string().required(),
  metaURL: Joi.string().allow('').default(''),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(null),
  _unread: Joi.boolean().default(true),
});

const validateSchema = async (schema) => {
  return await MESSAGE_COLLECTION_SCHEMA.validateAsync(schema, { abortEarly: false });
};

const saveModel = async (data) => {
  try {
    const validatedSchema = await validateSchema(data);

    const newObj = {
      ...validatedSchema,
      conversation: new ObjectId(validatedSchema.conversation),
      sendById: new ObjectId(validatedSchema.sendById),
    };

    return await GET_DB().collection(MESSAGE_COLLECTION_NAME).insertOne(newObj);
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(MESSAGE_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
  } catch (error) {
    throw new Error(error);
  }
};

const findById = async (id, startIndex, limit, fromDate) => {
  try {
    return await GET_DB()
      .collection(MESSAGE_COLLECTION_NAME)
      .find(
        { conversation: new ObjectId(id), createdAt: { $lte: new Date(fromDate) } },
        { sort: { createdAt: -1 } },
      )
      .limit(limit)
      .skip(startIndex)
      .toArray();
  } catch (error) {
    throw new Error(error);
  }
};

const countAmount = async () => {
  try {
    //get all id and username only from users (check properties _destroy = false)
    return await GET_DB().collection(MESSAGE_COLLECTION_NAME).countDocuments();
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @return set _unread where condition
 */
const updateManyMessageStatus = async (filter) => {
  try {
    return await GET_DB()
      .collection(MESSAGE_COLLECTION_NAME)
      .updateMany(
        filter,
        {
          $set: {
            _unread: false,
            updatedAt: new Date(),
          },
        },
        // { multi: true },
      );
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @return new message
 */
const newMessage = async (conversation) => {
  try {
    return await GET_DB()
      .collection(MESSAGE_COLLECTION_NAME)
      .findOne(
        {
          conversation: new ObjectId(conversation),
        },
        { sort: { createdAt: -1 } },
      );
  } catch (error) {
    throw new Error(error);
  }
};

export const messageModel = {
  MESSAGE_COLLECTION_NAME,
  MESSAGE_COLLECTION_SCHEMA,
  saveModel,
  findById,
  countAmount,
  findOneById,
  updateManyMessageStatus,
  newMessage,
};
