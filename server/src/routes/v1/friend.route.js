import express from 'express';
import { friendController } from '~/controllers/friend.controller';
import { verifyTokenMiddleware } from '~/middlewares/verifyToken.middleware';

const Router = express.Router();

// Verify all router with friend
Router.use(verifyTokenMiddleware.verifyToken);

Router.route('/add/:friendId').post(friendController.addFriend);
Router.route('/accept/:friendId').patch(friendController.acceptFriend);
Router.route('/reject/:friendId').post(friendController.rejectFriend);
Router.route('/getAll').get(friendController.getFriends);
Router.route('/getUnFriends').get(friendController.getUserNotFriend);

export const friendRoute = Router;
