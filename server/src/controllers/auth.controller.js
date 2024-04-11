import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { userService } from '~/services/user.service';
import { generateAccessToken, generateRefreshToken } from '~/utils/token';
import { RefreshTokenService } from '~/services/refreshToken.service';
import { env } from '~/config/environment';
import { Algorithms } from '~/utils/algorithms';

const register = async (req, res, next) => {
  try {
    const { username, email, publicKey } = req.body;
    const user = await userService.getOneUserByFilter({ email: email });
    if (Object.keys(user).length !== 0)
      throw new ApiError(StatusCodes.BAD_REQUEST, 'User with given email already exist');

    await userService.createNew({
      username: username,
      email: email,
      publicKeyCredential: publicKey,
    });

    res.status(StatusCodes.CREATED).json({
      message: 'Account created sucessfully',
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, tokenKey } = req.body;

    const existUser = await userService.getOneUserByEmail(email);

    if (!existUser) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');

    const verifiedToken = await Algorithms.decryptToken(tokenKey, existUser.publicKey);
    const curTime = new Date().getTime();

    if (verifiedToken < curTime - 3 || verifiedToken > curTime)
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid email or password');

    const accessToken = generateAccessToken({
      _id: existUser._id,
      email: existUser.email,
      username: existUser.username,
    });

    const { refreshToken, expireDate } = generateRefreshToken({
      _id: existUser._id,
      email: existUser.email,
      username: existUser.username,
    });

    await RefreshTokenService.createNew({
      token: refreshToken,
      userId: existUser._id.toString(),
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
      message: 'Logged in sucessfully',
      user: existUser,
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login,
};
