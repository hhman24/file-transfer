/* eslint-disable no-useless-catch */
import { RefreshTokenModule } from '~/models/RefreshTokenModel';

const createNew = async ({ token, userId, expireDate }) => {
  try {
    const newFreshToken = RefreshTokenModule.saveModel({ token, userId, expireDate });

    return await RefreshTokenModule.findOneById(newFreshToken._id);
  } catch (error) {
    throw error;
  }
};

const getOneByFilter = async (filter) => {
  try {
    return await RefreshTokenModule.findOneByFilter(filter);
  } catch (error) {
    throw error;
  }
};

const deleteOneByFilter = async (filter) => {
  try {
    return await RefreshTokenModule.deleteOneByFilter(filter);
  } catch (error) {
    throw error;
  }
};

export const RefreshTokenService = {
  createNew,
  getOneByFilter,
  deleteOneByFilter,
};
