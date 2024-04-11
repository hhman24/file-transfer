import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { userService } from '~/services/user.service';
import { Algorithms } from '~/utils/algorithms.js';
import { generateAccessToken, generateRefreshToken } from '~/utils/token';
import { RefreshTokenService } from '~/services/refreshToken.service';
import { env } from '~/config/environment';

const register = async (req, res, next) => {
  try {
    const { username, email, publicKey } = req.body;
    const user = await userService.getOneUserByFilter({ email: email });
    if (Object.keys(user).length !== 0)
      throw new ApiError(StatusCodes.BAD_REQUEST, 'User with given email already exist');

    await userService.createNew({ username: username, email: email, publicKey: publicKey });

    res.status(StatusCodes.CREATED).json({
      message: 'Account created sucessfully',
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const curTime = new Date().getTime();

    const { email, message, signature} = req.body;

    const existUser = await userService.getOneUserByEmail(email);

    if (!existUser) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');

<<<<<<< HEAD
    const isValid = Algorithms.verifySignature(message, signature, existUser.publicKey);

    //if signature is valid and time is not expired (3s) => login
    if (!isValid || curTime - new Date(message) > 3000) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }
=======
    // const verifiedToken = Algorithms.decryptToken(tokenKey, existUser.publicKey);
    // const curTime = new Date().getTime();

    // if (verifiedToken < curTime - 3 || verifiedToken > curTime)
    //   throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid email or password');
>>>>>>> 24809357159ef2031244e4b73b06caad8a7db70b

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
