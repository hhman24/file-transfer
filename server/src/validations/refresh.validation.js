import Joi from 'joi';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

const refreshToken = async (req, res, next) => {
  const correctCondition = Joi.object({
    refreshToken: Joi.string().required(),
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

export const refreshValidation = {
  refreshToken,
};
