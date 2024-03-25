import express from 'express';
import { messageController } from '~/controllers/message.controller';

const Router = express.Router();

Router.route('/:id').get(messageController.getMsgById);

export const messageRoute = Router;
