/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { userValidation } from '~/validations/user.validation';
import { userController } from '~/controllers/user.controller';
//import jwt from midleware

import { JWT } from '~/middlewares/verifyJWT';
const Router = express.Router();

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Welcome to user route' });
  })

Router.route('/user/:id').get(userController.getOne);
Router.route('/getAll').get(userController.getAll);
Router.route('/signup').post(userValidation.createNew, userController.createNew);
Router.route('/login').post(userValidation.createNew, userController.login);
Router.route('/logout').post(userController.logout);
Router.route('/remove').get(JWT.verifyJWT, userController.remove);
Router.route('/message/:id').get(userController.getMsgById);


export const userRoute = Router;