import Joi from 'joi';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/patternValidator';

const sendMsg = async (req, res, next) => {
  const correctCondition = Joi.object({
    friendId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .messages({
        'any.required': 'friendId is required (hhman)',
      }),
    contact: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .messages({
        'any.required': 'contact is required (hhman)',
      }),
    content: Joi.string().min(1).required().trim().strict().messages({
      'any.required': 'content is required (hhman)',
    }),
    metaURL: Joi.string().trim().allow(''),
  });

  try {
    // disable abortEarly để check toàn bộ lỗi
    await correctCondition.validateAsync(
      { ...req.body, friendId: req.params.friendId },
      { abortEarly: false },
    );
    // validate successly
    next();
  } catch (errors) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(errors).message));
  }
};

export const messageValidation = {
  sendMsg,
};
