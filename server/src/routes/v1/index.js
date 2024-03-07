/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { userRoute } from './user.route';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs v1 are ready to use.'
  });
});

Router.use('/users', userRoute);

export const API_v1 = Router;
