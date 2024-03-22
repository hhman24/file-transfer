import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { userController } from '~/controllers/user.controller';
//import jwt from midleware

const Router = express.Router();

Router.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Welcome to user route' });
});

Router.route('/getAll').get(userController.getAll);
Router.route('/message/:id').get(userController.getMsgById);

Router.route('/u/:id')
  .get(userController.getOne)
  .put() // update
  .delete(); // delete

export const userRoute = Router;
