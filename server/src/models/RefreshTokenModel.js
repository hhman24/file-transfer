import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';
import { REFRESH_TOKEN_STATUS } from '~/utils/constants';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/patternValidator';

const REFRESH_TOKEN_COLLECTION_NAME = 'RefreshTokens';
const REFRESH_TOKEN_SCHEMA = Joi.object({
  token: Joi.string().required(),
  userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE), // Đổi từ Schema.Types.ObjectId thành string
  expireDate: Joi.date().required(),
  status: Joi.string()
    .valid(...Object.values(REFRESH_TOKEN_STATUS))
    .default(REFRESH_TOKEN_STATUS.ACTIVE),
});

const validateSchema = async (schema) => {
  return await REFRESH_TOKEN_SCHEMA.validateAsync(schema, { abortEarly: false });
};

const saveModel = async (data) => {
  try {
    const validatedSchema = await validateSchema(data);

    const newObj = {
      ...validatedSchema,
      userId: new ObjectId(validatedSchema.userId),
    };

    // kiểm tra xem đã tồn tại chưa và còn active thì thu hồi
    await GET_DB()
      .collection(REFRESH_TOKEN_COLLECTION_NAME)
      .updateMany(
        {
          userId: newObj.userId,
          status: REFRESH_TOKEN_STATUS.ACTIVE, // Chỉ lấy các refresh token còn active
          expireDate: { $gt: new Date() }, // Chỉ lấy các refresh token chưa hết hạn
        },
        {
          $set: { status: REFRESH_TOKEN_STATUS.REVOKED }, // Cập nhật trạng thái của các refresh token thành "revoked"
        },
      );

    return await GET_DB().collection(REFRESH_TOKEN_COLLECTION_NAME).insertOne(newObj);
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(REFRESH_TOKEN_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
  } catch (error) {
    throw new Error(error);
  }
};

const findOneByFilter = async (filter) => {
  try {
    return await GET_DB().collection(REFRESH_TOKEN_COLLECTION_NAME).findOne(filter);
  } catch (error) {
    throw new Error(error);
  }
};

const revokedToken = async (token) => {
  try {
    return await GET_DB()
      .collection(REFRESH_TOKEN_COLLECTION_NAME)
      .findOneAndUpdate(
        { token: token },
        {
          $set: {
            status: REFRESH_TOKEN_STATUS.REVOKED,
          },
        },
      );
  } catch (error) {
    throw new Error(error);
  }
};

const deleteOneByFilter = async (filter) => {
  try {
    const userToken = await GET_DB().collection(REFRESH_TOKEN_COLLECTION_NAME).findOne(filter); // Tìm kiếm userToken dựa trên filter

    if (userToken) {
      await GET_DB().collection(REFRESH_TOKEN_COLLECTION_NAME).deleteOne({ _id: userToken._id }); // Nếu tìm thấy, xóa userToken
    }

    return userToken; // Trả về userToken hoặc null
  } catch (error) {
    throw new Error(error);
  }
};

export const RefreshTokenModule = {
  REFRESH_TOKEN_COLLECTION_NAME,
  REFRESH_TOKEN_SCHEMA,
  saveModel,
  findOneByFilter,
  findOneById,
  deleteOneByFilter,
  revokedToken,
};
