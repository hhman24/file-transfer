import { StatusCodes } from 'http-status-codes';
import { friendService } from '~/services/friend.service';
import { messageService } from '~/services/message.service';
import ApiError from '~/utils/ApiError';
import { EVENT } from '~/utils/constants';
import { messageValidation } from '~/validations/message.validation';

export const startConversation = (io, userSocketMap) => async (payload, callback) => {
  console.log(`conversation event has been received with ${JSON.stringify(payload)} 🍅🍋`);
  try {
    const { fromId, toId, conversation } = payload;

    const existContact = await friendService.findConversation(conversation);

    if (!existContact) throw new ApiError(StatusCodes.BAD_REQUEST, 'Not found contact');

    if (existContact.userA.toString() === fromId || existContact.userB.toString() === fromId) {
      // set _unread = false, where sendId !== userId and userId is memebers in conversation

      const newMessage = await messageService.readMsg(fromId, conversation);

      io.to(userSocketMap[toId]).emit(EVENT.SEEN_MESSAGE, {
        lastMessage: newMessage,
      });

      io.to(userSocketMap[fromId]).emit(EVENT.SEEN_MESSAGE, {
        lastMessage: newMessage,
      });
    }
  } catch (error) {
    callback(error);
  }
};

export const sendMessageEvent = (io, userSocketMap) => async (payload, callback) => {
  console.log(`send text msg event has been received with ${JSON.stringify(payload)} 🍅🍋`);
  try {
    // data: {fromId, toId, conversation, content, metaURL = ''}
    await messageValidation.sendMsgSocket(payload);

    const { fromId, toId, conversation, content, metaData } = payload;

    const existContact = await friendService.findConversation(conversation);

    if (!existContact) throw new ApiError(StatusCodes.BAD_REQUEST, 'Not found contact');

    if (
      (existContact.userA.toString() === fromId && existContact.userB.toString() === toId) ||
      (existContact.userA.toString() === toId && existContact.userB.toString() === fromId)
    ) {
      const msg = await messageService.sendMsg({
        conversation: conversation,
        content: content,
        metaData: metaData,
        sendById: fromId,
      });

      io.to(userSocketMap[fromId]).emit(EVENT.NEW_MESSAGE, {
        message: msg,
      });

      io.to(userSocketMap[toId]).emit(EVENT.NEW_MESSAGE, {
        message: msg,
      });
    } else {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Not your friend');
    }
  } catch (error) {
    callback(error);
  }
};

export const sendFileMessageEvent = (io, socket) => async (payload, callback) => {
  console.log(`send file msg event has been received with ${JSON.stringify(payload)} 🍅🍋`);

  // data: {frinedId, conversation, content = '', metaURL}

  // get file extension

  // upload file to aws s3

  // emit incomming msg -> to friendId

  // emit outgoing msg -> from user
};
