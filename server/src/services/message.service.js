/* eslint-disable no-useless-catch */
import { ObjectId } from 'mongodb';
import { messageModel } from '~/models/MessageModel';

// get msg from date
const getMsgById = async (req) => {
  const { id } = req.params;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const fromDate = req.query.date;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await messageModel.countAmount())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.results = await messageModel.findById(id, startIndex, limit, fromDate);
    return results;
  } catch (error) {
    throw error;
  }
};

/**
 * @dev send ecrypted message with encrypted metaURL
 * @param data: {...req.body, sendById: req.user._id.toString()}
 * @returns object or null
 */
const sendMsg = async (data) => {
  try {
    const res = await messageModel.saveModel({
      conversation: data.conversation,
      sendById: data.sendById,
      content: data.content,
      metaData: data.metaData,
    });
    return await messageModel.findOneById(res.insertedId);
  } catch (error) {
    throw error;
  }
};

/**
 * @dev set _unread = false where sendById !== userId
 * @return new message
 */

const readMsg = async (userId, conversation) => {
  try {
    await messageModel.updateManyMessageStatus({
      conversation: new ObjectId(conversation),
      sendById: { $ne: new ObjectId(userId) },
      _unread: true,
    });
    return await messageModel.newMessage(conversation);
  } catch (error) {
    throw error;
  }
};

export const messageService = { getMsgById, sendMsg, readMsg };
