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
};

const getOne = async (id) => {
  try {
    return await UserModel.findOneById(id);
  } catch (error) {
    throw error;
  }
};

const login = async (body) => {
  try {
    const { username, password } = body;
    const user = await UserModel.findOneByUsername(username);
    let isPasswordCorrect = true;
    if (password == user.password) {
      isPasswordCorrect = true;
    } else isPasswordCorrect = false;
    //const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    if (user && isPasswordCorrect) return user;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    return await UserModel.removeModel(id);
  } catch (error) {
    throw error;
  }
};

export const userService = {
  createNew,
  getAll,
  getOne,
  login,
  remove
};
