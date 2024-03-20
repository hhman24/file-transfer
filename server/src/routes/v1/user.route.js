/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { userController } from '~/controllers/user.controller';
import { JWT } from '~/middlewares/verifyToken.middleware';
//import jwt from midleware

const Router = express.Router();

Router.route('/').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Welcome to user route' });
});

Router.route('/getAll').get(userController.getAll);

Router.route('/u/:id')
  .get(userController.getOne)
  .put() // update
  .delete(); // delete

// Router.route('/remove').get(JWT.verifyJWT, userController.remove); // ?

export const userRoute = Router;
