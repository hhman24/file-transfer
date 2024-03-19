/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '~/models/UserModel';
import ApiError from '~/utils/ApiError';

// create new user
const createNew = async (body) => {
  try {
    const createdUser = await UserModel.saveModel(body);

    const getNewUser = await UserModel.findOneById(createdUser.insertedId);

    return getNewUser;
  } catch (error) {
    throw error;
  }
};

// Get all user
const getAll = async () => {
  try {
    return await UserModel.get_all_users();
  } catch (error) {
    throw error;
  }
};

//  Get user by id
const getOne = async (id) => {
  try {
    // hhman - update: check user exist
    const user = UserModel.getDetailsUser(id);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

//  Get user by email

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
