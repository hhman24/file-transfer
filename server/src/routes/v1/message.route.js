import express from 'express';
import { messageController } from '~/controllers/message.controller';
import { verifyTokenMiddleware } from '~/middlewares/verifyToken.middleware';
import { messageValidation } from '~/validations/message.validation';

const Router = express.Router();

// Verify all router with message
Router.use(verifyTokenMiddleware.verifyToken);

Router.route('/:id').get(messageController.getMsgById);
Router.route('/t/:friendId').post(messageValidation.sendMsg, messageController.sendMsg);

export const messageRoute = Router;
