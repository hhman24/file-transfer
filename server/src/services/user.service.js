/* eslint-disable no-useless-catch */
/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { UserModel } from '~/models/UserModel';
import { MsgModel } from '~/models/MessageModel';
import bcrypt from 'bcryptjs';
import { boolean } from 'joi';

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
const getMsgById = async (req) => {
  const { id } = req.params;
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  if (endIndex < await MsgModel.countAmount()) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }
  
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }  

  try {
    results.results =  await MsgModel.findById(id,startIndex, limit)
    return results
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
  remove,
  getMsgById
};
