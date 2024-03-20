import express from 'express';
import { authController } from '~/controllers/auth.controller';
import { authValidation } from '~/validations/auth.validation';

const Router = express.Router();

Router.route('/signup').post(authValidation.register, authController.register);
Router.route('/login').post(authValidation.signin, authController.login);
// Router.route('/logout').post(userController.logout);

export const authRoute = Router;
