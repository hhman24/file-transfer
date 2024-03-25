import express from 'express';
import { userController } from '~/controllers/user.controller';
import { verifyTokenMiddleware } from '~/middlewares/verifyToken.middleware';
//import jwt from midleware

const Router = express.Router();

Router.use(verifyTokenMiddleware.verifyToken);

Router.route('/getAll').get(userController.getAll);
Router.route('/message/:id').get(userController.getMsgById);

Router.route('/u/:id')
  .get(userController.getOne)
  .put() // update
  .delete(); // delete

export const userRoute = Router;
