import express from 'express';
import { authController } from '~/controllers/auth.controller';
import { userValidation } from '~/validations/auth.validation';

const Router = express.Router();

Router.route('/').post(userValidation.register, authController.register);
// Router.route('/logout').post(userController.logout);

export const refreshRoute = Router;
