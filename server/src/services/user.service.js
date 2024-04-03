/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { UserModel } from '~/models/UserModel';
import ApiError from '~/utils/ApiError';

// create new user
const createNew = async (body) => {
  try {
    const createdUser = await UserModel.saveModel(body);

    const getNewUser = await UserModel.findOneById(createdUser.insertedId);

    return getNewUser;
  } catch (error) {
    throw new Error(error);
  }
};

// Get all user
const getAll = async () => {
  try {
    return await UserModel.get_all_users();
  } catch (error) {
    throw new Error(error);
  }
};

//  Get user by id
const getOne = async (id) => {
  try {
    // hhman - update: check user exist
    const user = await UserModel.getOneUserDetailsByFilter({
      _id: new ObjectId(id),
      _destroy: false,
    });

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// Get one user by aggregate and have friends list
const getOneUserByFilter = async (filter) => {
  try {
    const user = await UserModel.getOneUserDetailsByFilter(filter);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// get one user by email but no detail
const getOneUserByEmail = async (email) => {
  try {
    const user = await UserModel.getOneUserByFilter({
      email: email,
      _destroy: false,
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @dev find one user by id
 * @returns {...} or null
 */
const getOneUserById = async (id) => {
  try {
    const user = await UserModel.getOneUserByFilter({
      _id: new ObjectId(id),
      _destroy: false,
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const remove = async (id) => {
  try {
    return await UserModel.removeModel(id);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @dev change user status online
 * @returns {...} or null
 */

const changeStatus = async (id, status) => {
  try {
    const existUser = await UserModel.findOneById(id.toString());
    if (!existUser) throw new ApiError(StatusCodes.BAD_REQUEST, 'No exist user');

    if (status) {
      return await UserModel.findOneAndUpdateById(id.toString(), {
        $set: {
          online: true,
        },
      });
    } else {
      return await UserModel.findOneAndUpdateById(id.toString(), {
        $set: {
          online: false,
          lastOnline: new Date(),
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

export const userService = {
  createNew,
  getAll,
  getOne,
  remove,
  getOneUserByFilter,
  getOneUserByEmail,
  getOneUserById,
  changeStatus,
};
