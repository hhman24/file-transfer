/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { userService } from '~/services/user.service';

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body);
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'hhman');
    // res
    //   .status(StatusCodes.CREATED)
    //   .json({ message: 'Note: API create user for validation' });

    const data = { ...req.body };

    // create data
    const createdUser = await userService.createNew(data);

    if (!createdUser) {
      next(ApiError(StatusCodes.BAD_REQUEST, 'User not created'));
    }

    res.status(StatusCodes.CREATED).json({
      message: 'Create User successfully',
      data: createdUser
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createNew
};
