/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'hhman');
    // res
    //   .status(StatusCodes.CREATED)
    //   .json({ message: 'Note: API create user for validation' });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createNew
};
