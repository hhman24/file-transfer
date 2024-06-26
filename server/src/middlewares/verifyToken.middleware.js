// verify JWT
import jwt from 'jsonwebtoken';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

import { env } from '~/config/environment';
import { userService } from '~/services/user.service';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers.accesstoken;
    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You not authentication');
    }

    const accessToken = token.split(' ')[1];
    const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_PRIVATE_KEY);
    const user = await userService.getOne(decoded._id);
    if (Object.keys(user) === 0) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Token is not valid');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token expired'));
    } else {
      next(error);
    }
  }
};

export const verifyTokenMiddleware = {
  verifyToken,
};
