import { createSlice } from '@reduxjs/toolkit';

// ****** Type for data ******
/*
data = {
    _id: string,
    username: string,
    password: string,
    publickey: string,
    online: bool,
}
*/

const initialState = {
  state: {
    isLoginIn: false,
  },
  isAuthenticated: true,
  data: null,
  token: '',
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setLogin(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
