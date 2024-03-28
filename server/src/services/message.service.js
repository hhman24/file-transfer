/* eslint-disable no-useless-catch */
import { messageModel } from '~/models/MessageModel';

const getMsgById = async (req) => {
  const { id } = req.params;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

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
    results.results = await messageModel.findById(id, startIndex, limit);
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
      metaURL: data.metaURL,
    });
    return await messageModel.findOneById(res.insertedId);
  } catch (error) {
    throw error;
  }
};

export const messageService = { getMsgById, sendMsg };
