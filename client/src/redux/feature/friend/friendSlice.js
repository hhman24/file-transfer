import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listFriend: [],
  isLoading: false,
  error: null,
};

const friendSlice = createSlice({
  initialState,
  name: 'friend',
  reducers: {
    setFriend: (state, action) => {
      state.listFriend.push(action.payload);
    },
  },
  extraReducers(builder) {},
});

export const { setFriend } = friendSlice.actions;
export default friendSlice.reducer;
