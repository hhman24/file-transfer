/* eslint-disable no-useless-catch */
/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { UserModel } from '~/models/UserModel';
const createNew = async (body) => {
  try {
    const createdUser = await UserModel.saveModel(body);

    const getNewUser = await UserModel.findOneById(createdUser.insertedId);

    return getNewUser;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    return await UserModel.get_all_users();
  } catch (error) {
    throw error;
  }
}

const getOne = async (id) => {
  try {
    return await UserModel.get_user(id);
  } catch (error) {
    throw error;
  }
}

export const userService = {
  createNew,
  getAll,
  getOne
};
