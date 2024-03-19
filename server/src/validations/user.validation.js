/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const register = async (req, res, next) => {
  const correctCondition = Joi.object({
    usename: Joi.string().min(3).max(30).required().trim().strict().messages({
      'any.required': 'username is required (hhman)',
    }),
    email: Joi.string().email().required().trim().strict().messages({
      'any.required': 'email is required (hhman)',
    }),
    password: Joi.string().trim().strict(),
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

export const userValidation = {
  register,
};
