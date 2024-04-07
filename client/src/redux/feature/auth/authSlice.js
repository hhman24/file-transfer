import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAxios } from '~/apis/axiosConfig';

const initialState = {
  loginState: {
    userInfo: null,
    token: '',
    isLogined: false,
  },
  registerState: {
    success: false,
  },
  error: null,
  isLoading: false,
};

export const registerUser = createAsyncThunk('auth/registerUser', async (body, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth.loginState;
    const axios = useAxios(state.token, thunkAPI.dispatch);
    const res = await axios.post(`/auth/signup`, body, { signal: thunkAPI.signal });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (body, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth.loginState;
    const axios = useAxios(state.token, thunkAPI.dispatch);
    const res = await axios.post(`/auth/login`, body, { signal: thunkAPI.signal });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth.loginState;
    const axios = useAxios(state.token, thunkAPI.dispatch);
    return (await axios.post(`/refresh/logout`, { signal: thunkAPI.signal })).data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setLogin: (state, action) => {
      state.loginState.userInfo = action.payload.user;
      state.loginState.token = action.payload.accessToken;
      state.loginState.isLogined = true;
      state.error = null;
    },
    setRegister: (state, action) => {
      state.registerState.success = action.payload;
    },
    setLogout: (state) => {
      state.loginState.userInfo = null;
      state.loginState.token = '';
      state.loginState.isLogined = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.loginState.userInfo = action.payload.user;
        state.loginState.token = action.payload.accessToken;
        state.loginState.isLogined = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginState.userInfo = null;
        state.loginState.token = '';
        state.loginState.isLogined = false;

        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerState.success = true;

        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerState.success = false;

        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loginState.userInfo = null;
        state.loginState.token = '';
        state.loginState.isLogined = false;

        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loginState.userInfo = null;
        state.loginState.token = '';
        state.loginState.isLogined = false;

        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setLogin, setLogout, setRegister } = authSlice.actions;
export default authSlice.reducer;
