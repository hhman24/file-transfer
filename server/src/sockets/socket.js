import http from 'http';
import { Server } from 'socket.io';
import { corsOptions } from '~/config/cors';
import { userService } from '~/services/user.service';
import { EVENT } from '~/utils/constants';
import { sendMessageEvent, startConversation } from './event/msg.event';
import { acceptFriendReqEvent, sendFriendReqEvent } from './event/friend.event';

const userSocketMap = {}; // userId: socketId
let ioInstance = null;

const SocketInit = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      corsOptions,
      methods: ['GET', 'POST'],
    },
  });

  ioInstance = io;

  return { server };
};

const GetRecipientSocketId = (recipientId) => {
  return userSocketMap[recipientId];
};

const GET_IO = () => {
  if (!ioInstance) throw new Error('Must connect to Socket first');
  return ioInstance;
};

const onConnection = () => {
  /**
   * Check io is global
   */
  if (!ioInstance) throw new Error('Must connect to Socket first');

  /**
   * Listening event
   */
  ioInstance.on('connection', async (socket) => {
    console.log('user connected', socket.id);
    const userId = socket.handshake.query.userId;

    /**
     * @dev notifi who's online
     */
    if (userId != null && Boolean(userId)) {
      try {
        await userService.changeStatus(userId, true);
        userSocketMap[userId] = socket.id;
        ioInstance.emit('getOnlineUsers', Object.keys(userSocketMap));
        console.log(userSocketMap);
      } catch (error) {
        console.log(error);
        // throw error;
      }
    }

    /**
     * @dev send messages
     */
    socket.on(EVENT.SEND_TEXT_MESSAGE, sendMessageEvent(ioInstance, userSocketMap));
    socket.on(EVENT.START_CONVERSATION, startConversation(ioInstance, userSocketMap));

    /**
     * @dev friend request
     */
    socket.on(EVENT.SEND_FRIEND_REQUEST, sendFriendReqEvent(ioInstance, userSocketMap));
    socket.on(EVENT.ACCEPT_FRIEND_REQUEST, acceptFriendReqEvent(ioInstance, userSocketMap));

    // -------------- HANDLE SOCKET DISCONNECTION ----------------- //
    socket.on('disconnect', () => {
      console.log('user disconnected');
      delete userSocketMap[userId];
      userService.changeStatus(userId, false);
      ioInstance.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });
};

export const SOCKET_IO = {
  SocketInit,
  GetRecipientSocketId,
  GET_IO,
  onConnection,
};
