import Joi from 'joi';

const FRIEND_COLLECTION_NAME = 'Friends';
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().min(3).max(30).required().trim().strict(),
  email: Joi.string().email().required().trim().strict(),
  password: Joi.string().strict(),
  PublicKeyCredential: Joi.string().strict().default(''),
  // friends: Joi.array()
  //   .items(Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
  //   .default([]),
  _destroy: Joi.boolean().default(false),
  online: Joi.boolean().default(false),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  // enums
  // type: Joi.string().valid('public', 'private').required();
});
