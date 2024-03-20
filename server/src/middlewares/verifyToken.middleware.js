// verify JWT
import jwt from 'jsonwebtoken';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';

import { env } from '~/config/environment';
import { userService } from '~/services/user.service';

const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You not authentication');
    }
    const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_PRIVATE_KEY);
    const user = await userService.getOne(decoded.userId);

    if (!user) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Token is not valid');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const VerifyTokenMiddleware = {
  verifyToken,
};
