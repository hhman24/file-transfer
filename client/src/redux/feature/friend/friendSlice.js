import { createSlice } from '@reduxjs/toolkit';

/**
 * @type listFriend: [
 * _id: uuid
 * userA: user
 * userB: user
 * enPrivateKey: string
 * status: enums [FRIEND_STATUS]
 * createAt: date
 * updateAt: date
 * lastMessage: Message
 * ]
 */

const initialState = {
  listFriend: [],
  selectedChat: undefined,
  isLoading: false,
  error: null,
};

const friendSlice = createSlice({
  initialState,
  name: 'friend',
  reducers: {
    addFriend: (state, action) => {
      state.listFriend.push(action.payload);
    },
    selectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
  extraReducers() {},
});

export const { addFriend, selectedChat } = friendSlice.actions;
export default friendSlice.reducer;
