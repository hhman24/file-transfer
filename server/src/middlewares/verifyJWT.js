// verify JWT
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/ApiError');
const { GET_DB } = require('../config/mongodb');
import { ObjectId } from 'mongodb';

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You need to login');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await GET_DB()
      .collection('users')
      .findOne({ _id: new ObjectId(decoded.userId) });
    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const JWT = {
  verifyJWT,
};
