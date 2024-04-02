import { friendService } from '~/services/friend.service';
import { EVENT } from '~/utils/constants';

/**
 * @dev listen event send req from userId to friendId
 * @param payload: {to, from}
 * @param socket
 */
export const sendFriendReqEvent = (io, userSocketMap) => async (payload, callback) => {
  try {
    console.log(`send friend req event has been received with ${JSON.stringify(payload)} 🍅🍋`);

    const { from, to } = payload;

    const conversataion = await friendService.addFriend({ userId: from, friendId: to });

    // emit event request received to recipient
    io.to(userSocketMap[to]).emit(EVENT.RECEIVE_FRIEND_REQUEST, {
      message: 'New friend request received',
      conversataion: conversataion,
    });

    io.to(userSocketMap[from]).emit(EVENT.RECEIVE_FRIEND_REQUEST, {
      message: 'New friend request received',
      conversataion: conversataion,
    });
  } catch (error) {
    console.log(error);
    callback(error);
  }
};

/**
 * @dev listen event accept req from friendId to userId
 * @param payload: {to, from}
 * @param socket
 */
export const acceptFriendReqEvent = (io, userSocketMap) => async (payload, callback) => {
  try {
    console.log(`accpet friend req event has been received with ${JSON.stringify(payload)} 🍅🍋`);

    const { from, to } = payload;

    const conversataion = await friendService.acceptedFriend({ userId: from, friendId: to });

    const res1 = await friendService.findContactById(conversataion._id, from);
    const res2 = await friendService.findContactById(conversataion._id, to);

    // emit event request received to recipient
    io.to(userSocketMap[from]).emit(EVENT.ACCEPT_FRIEND_REQUEST, {
      message: 'New friend request received',
      conversataion: res1,
    });

    io.to(userSocketMap[to]).emit(EVENT.ACCEPT_FRIEND_REQUEST, {
      message: 'New friend request received',
      conversataion: res2,
    });
  } catch (error) {
    callback(error);
  }
};
