/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { userValidation } from '~/validations/user.validation';
import { userController } from '~/controllers/user.controller';
const Router = express.Router();

Router.route('/')
  .get((req, res) => {


    res.status(StatusCodes.OK).json({ message: 'Note: API get list user', data : allUser });
  })
Router.route('/signup').post(userValidation.createNew, userController.createNew);
Router.route('/login').post(userValidation.createNew, userController.login);
Router.route('/logout').post(userController.logout);
export const userRoute = Router;
