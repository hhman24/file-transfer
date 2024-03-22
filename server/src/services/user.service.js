/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { UserModel } from '~/models/UserModel';
import { MsgModel } from '~/models/MessageModel';
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
const getMsgById = async (req) => {
  const { id } = req.params;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await MsgModel.countAmount())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.results = await MsgModel.findById(id, startIndex, limit);
    return results;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    return await UserModel.removeModel(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const userService = {
  createNew,
  getAll,
  getOne,
  remove,
  getMsgById,
  getOneUserByFilter,
  getOneUserByEmail,
};
