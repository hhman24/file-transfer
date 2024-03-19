/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express';
import { userValidation } from '~/validations/user.validation';
import { userController } from '~/controllers/user.controller';

const Router = express.Router();

Router.route('/signup').post(userValidation.register, userController.createNew);
Router.route('/login').post(userValidation.register, userController.login);
Router.route('/logout').post(userController.logout);

export const authRoute = Router;
