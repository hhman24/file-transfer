import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: [],
  isLoading: false,
  error: null,
};

const messageSlice = createSlice({
  initialState,
  name: 'message',
  reducers: {
    sendMsg: (state, action) => {
      state.message.push(action.payload);
    },
  },
  extraReducers() {},
});

export const { sendMsg } = messageSlice.actions;
export default messageSlice.reducer;
