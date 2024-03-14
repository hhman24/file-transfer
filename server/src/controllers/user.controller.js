/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { userService } from '~/services/user.service';
import generateTokenAndSetCookie from "../utils/generateToken.js";
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
    generateTokenAndSetCookie(createdUser._id, res);
    res.status(StatusCodes.CREATED).json({
      message: 'Create User successfully',
      data: createdUser
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    // console.log(req.body);
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'hhman');
    // res
    //   .status(StatusCodes.CREATED)
    //   .json({ message: 'Note: API create user for validation' });

    const data = { ...req.body };

    // get data
    const loginUser = await userService.login(data);

    if (!loginUser) {
      next(ApiError(StatusCodes.BAD_REQUEST, 'User not loginUser'));
    }
    generateTokenAndSetCookie(loginUser._id, res);
    res.status(StatusCodes.OK).json({
      message: 'loginUser successfully',
      data: loginUser
    });
  } catch (error) {
    next(error);
  }
};


const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const  getAll = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
  }
}

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getOne(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
}

const remove = async (req, res, next) => {
  try {
    const removedUser = await userService.remove(req.user._id);
    if(!removedUser) {
      next(ApiError(StatusCodes.BAD_REQUEST, 'User not removed'));
    }
    res.status(StatusCodes.OK).json({
      message: 'Remove user successfully',
      data: removedUser
    });
  } catch (error) {
    next(error);
  }
}

export const userController = {
  createNew,login,logout,
  createNew,
  getAll,
  getOne,
  remove
};
