import express from 'express';
import { refreshTokenController } from '~/controllers/refreshToken.controller';
import { verifyTokenMiddleware } from '~/middlewares/verifyToken.middleware';
import { refreshValidation } from '~/validations/refresh.validation';

const Router = express.Router();

Router.route('/').post(refreshValidation.refreshToken, refreshTokenController.refresh);
Router.route('/logout').post(
  refreshValidation.refreshToken,
  verifyTokenMiddleware.verifyToken,
  refreshTokenController.logout,
);

export const refreshRoute = Router;
