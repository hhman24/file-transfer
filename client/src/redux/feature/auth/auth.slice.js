import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './authAction';

// ****** Type for data ******
/*
userInfo = {
    _id: string,
    username: string,
    password: string,
    publickey: string,
    online: bool,
}
*/

const initialState = {
  sLogin: {
    isAuthenticated: false,
    isLoginIn: false,
    userInfo: {},
    token: '',
  },
  sRegister: {
    success: false,
  },
  error: null,
  loading: false,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setLogin(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.sRegister.success = true;
      })
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = false;
          state.error = null;
        },
      )
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
