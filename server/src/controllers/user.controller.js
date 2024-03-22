import ApiError from '~/utils/ApiError';
import generateTokenAndSetCookie from '../utils/token.js';
import { StatusCodes } from 'http-status-codes';
import { userService } from '~/services/user.service';

const createNew = async (req, res, next) => {
  try {
    const data = { ...req.body };

    // create data
    const createdUser = await userService.createNew(data);

    if (!createdUser) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'User not created');
    }
    generateTokenAndSetCookie(createdUser._id, res);
    res.status(StatusCodes.CREATED).json({
      message: 'Create User successfully',
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getOne(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const removedUser = await userService.remove(req.user._id);
    if (!removedUser) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'User not removed');
    }
    res.status(StatusCodes.OK).json({
      message: 'Remove user successfully',
      data: removedUser,
    });
  } catch (error) {
    next(error);
  }
};

const getMsgById = async (req, res, next) => {
  try {
    const result = await userService.getMsgById(req);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createNew,
  getAll,
  getOne,
  remove,
  getMsgById,
};
