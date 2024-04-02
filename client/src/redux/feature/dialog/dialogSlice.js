import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const dialogSlice = createSlice({
  initialState,
  name: 'dialog',
  reducers: {
    setClose: (state) => {
      state.open = false;
    },
    setOpen: (state) => {
      state.open = true;
    },
  },
});

export const { setClose, setOpen } = dialogSlice.actions;
export default dialogSlice.reducer;
