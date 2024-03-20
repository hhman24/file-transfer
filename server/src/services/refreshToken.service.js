/* eslint-disable no-useless-catch */
import { RefreshTokenModule } from '~/models/RefreshTokenModel';
import { REFRESH_TOKEN_STATUS } from '~/utils/constants';
import { userService } from './user.service';

const createNew = async ({ token, userId, expireDate }) => {
  try {
    const newFreshToken = RefreshTokenModule.saveModel({ token, userId, expireDate });

    return await RefreshTokenModule.findOneById(newFreshToken._id);
  } catch (error) {
    throw new Error(error);
  }
};

const findRefreshTokenByToken = async (token) => {
  try {
    const refreshToken = await RefreshTokenModule.findOneByFilter({
      token: token,
      status: REFRESH_TOKEN_STATUS.ACTIVE,
      expireDate: { $gt: new Date() },
    });

    const user = await userService.getOneUserByFilter({ _id: refreshToken.userId });

    return { ...refreshToken, userId: user };
  } catch (error) {
    throw new Error(error);
  }
};

const revokedToken = async (token) => {
  try {
    return await RefreshTokenModule.revokedToken(token);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteOneByFilter = async (filter) => {
  try {
    return await RefreshTokenModule.deleteOneByFilter(filter);
  } catch (error) {
    throw new Error(error);
  }
};

export const RefreshTokenService = {
  createNew,
  findRefreshTokenByToken,
  deleteOneByFilter,
  revokedToken,
};
