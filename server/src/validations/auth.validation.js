import Joi from 'joi';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().min(3).max(30).required().trim().strict().messages({
      'any.required': 'username is required (hhman)',
    }),
    email: Joi.string().email().required().trim().strict().messages({
      'any.required': 'email is required (hhman)',
    }),
    // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).trim().strict(),
    publicKey: Joi.string().strict(),
  });

  try {
    // disable abortEarly để check toàn bộ lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // validate successly
    next();
  } catch (errors) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(errors).message));
  }
};

const signin = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required().trim().strict().messages({
      'any.required': 'email is required (hhman)',
    }),
    signature: Joi.string(),
    message: Joi.string(),
  });

  try {
    // disable abortEarly để check toàn bộ lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // validate successly
    next();
  } catch (errors) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(errors).message));
  }
};

export const authValidation = {
  register,
  signin,
};
