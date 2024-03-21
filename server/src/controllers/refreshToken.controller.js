import ApiError from '~/utils/ApiError';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { RefreshTokenService } from '~/services/refreshToken.service';
import { env } from '~/config/environment';
import { generateAccessToken, generateRefreshToken } from '~/utils/token';

const refresh = async (req, res, next) => {
  try {
    const cookiesRefreshToken = req.cookies.refresh_token;
    const storedRefreshToken =
      await RefreshTokenService.findRefreshTokenByToken(cookiesRefreshToken);

    console.log(storedRefreshToken);

    if (!storedRefreshToken) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized');

    try {
      const valideUser = jwt.verify(cookiesRefreshToken, env.REFRESH_TOKEN_PRIVATE_KEY);

      if (valideUser._id.toString() !== storedRefreshToken.userId._id.toString()) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
      }

      const newAccessToken = generateAccessToken({
        _id: storedRefreshToken.userId._id,
        email: storedRefreshToken.userId.email,
        username: storedRefreshToken.userId.username,
      });

      const { refreshToken, expireDate } = generateRefreshToken({
        _id: storedRefreshToken.userId._id,
        email: storedRefreshToken.userId.email,
        username: storedRefreshToken.userId.username,
      });

      await RefreshTokenService.createNew({
        token: refreshToken,
        userId: storedRefreshToken.userId._id.toString(),
        expireDate: expireDate,
      });

      // setCookie
      res.cookie('refresh_token', refreshToken, {
        maxAge: 1 * 24 * 60 * 60 * 10000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
        secure: env.BUILD_MODE !== 'dev',
      });

      res.status(StatusCodes.OK).json({
        message: 'Access token created successfully',
        user: storedRefreshToken.userId,
        accessToken: newAccessToken,
      });
    } catch (errorJWT) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden');
    }
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refresh_token;
    const userToken = await RefreshTokenService.findRefreshTokenByToken(token);

    if (!userToken) {
      return res.status(StatusCodes.OK).json({
        message: 'Logged Out Sucessfully',
      });
    }

    await RefreshTokenService.revokedToken(userToken.token);
    return res.status(StatusCodes.OK).json({
      message: 'Logged Out Sucessfully',
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = {
  refresh,
  logout,
};
