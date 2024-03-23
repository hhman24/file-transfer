import express from 'express';
import { friendController } from '~/controllers/friend.controller';
import { verifyTokenMiddleware } from '~/middlewares/verifyToken.middleware';

const Router = express.Router();

// Verify all router with friend
Router.use(verifyTokenMiddleware.verifyToken);

Router.route('/add/:friendId').post(friendController.addFriend);
Router.route('/access/:id').patch(friendController.accessFriend);
Router.route('/reject/:id').patch(friendController.rejectFriend);

export const friendRoute = Router;
