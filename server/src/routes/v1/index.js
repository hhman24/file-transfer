import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { userRoute } from './user.route';
import { authRoute } from './auth.route';
import { refreshRoute } from './refreshToken.route';
import { friendRoute } from './friend.route';
import { messageRoute } from './message.route';
import {uploadRoute} from './upload.route';
const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs v1 are ready to use.',
  });
});

Router.use('/users', userRoute);
Router.use('/friend', friendRoute);
Router.use('/message', messageRoute);
Router.use('/auth', authRoute);
Router.use('/refresh', refreshRoute);
Router.use('/upload', uploadRoute);

export const API_v1 = Router;
