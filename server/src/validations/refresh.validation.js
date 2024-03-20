import Joi from 'joi';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

const refreshToken = async (req, res, next) => {
  const correctCondition = Joi.object({
    refreshToken: Joi.string().required().messages({
      'any.required': 'refreshToken is required (hhman)',
    }),
  });

  try {
    // disable abortEarly để check toàn bộ lỗi
    await correctCondition.validateAsync(
      { refreshToken: req.cookies.refresh_token },
      { abortEarly: false },
    );

    // validate successly
    next();
  } catch (errors) {
    // Kiểm tra nếu lỗi không có refreshToken
    if (errors.details.some((error) => error.type === 'any.required')) {
      // Trả về lỗi bad request nếu không có refreshToken
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'Refresh token is missing'));
    }
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(errors).message));
  }
};

export const refreshValidation = {
  refreshToken,
};
