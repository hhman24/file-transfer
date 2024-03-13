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
    res.status(StatusCodes.OK).json({ message: 'Note: API get list user' });
  })
  .post(userValidation.createNew, userController.createNew);

Router.route('/user/:id')
  .get(userController.getOne);

Router.route('/getAll')
  .get(userController.getAll);

export const userRoute = Router;