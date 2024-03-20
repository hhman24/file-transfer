import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { userService } from '~/services/user.service';
import { Algorithms } from '~/utils/algorithms.js';
import { generateAccessToken, generateRefreshToken } from '~/utils/generateToken';
import { RefreshTokenService } from '~/services/refreshToken.service';
import { env } from '~/config/environment';

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.getOneUserByFilter({ email: email });
    if (!user) next(ApiError(StatusCodes.BAD_REQUEST, 'User with given email already exist'));

    const hashPassword = await Algorithms.hashPassword(password);

    await userService.createNew({ username: username, email: email, password: hashPassword });

    res.status(StatusCodes.CREATED).json({
      message: 'Account created sucessfully',
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await userService.getOneUserByEmail(email);

  if (!existUser) next(ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password'));

  const verifiedPassword = await Algorithms.comparePasswords(password, existUser.password);

  if (!verifiedPassword) next(ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password'));

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
  res.cookie('git ', accessToken, {
    maxAge: 1 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
    secure: env.BUILD_MODE !== 'dev',
  });

  // setCookie
  res.cookie('refresh_token', refreshToken, {
    maxAge: 1 * 24 * 60 * 60 * 10000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
    secure: env.BUILD_MODE !== 'dev',
  });

  delete existUser.password;

  res.status(StatusCodes.OK).json({
    message: 'Logged in sucessfully',
    user: existUser,
  });
};

export const authController = {
  register,
  login,
};
