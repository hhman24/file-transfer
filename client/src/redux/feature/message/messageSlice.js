import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAxios } from '~/apis/axiosConfig';

/**
 * @type message
 * _id: uuid
 * sendById: uuid
 * content string
 * metaURL: string
 * createdAt: date
 * updatedAt: date
 * _unread: boolean
 */

const initialState = {
  message: [],
  isLoading: false,
  error: null,
  currentRequestId: undefined,
};

export const getMsg = createAsyncThunk('message/getMsg', async ({ id, page, limit }, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth.loginState;
    const axios = useAxios(state.token, thunkAPI.dispatch);
    const res = await axios.get(`/message/${id}`, { params: { page: page, limit: limit }, signal: thunkAPI.signal });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

const messageSlice = createSlice({
  initialState,
  name: 'message',
  reducers: {
    sendMsg: (state, action) => {
      state.message.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMsg.fulfilled, (state, action) => {
        console.log(action.payload);
        state.message = action.payload.results;
      })
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.currentRequestId = action.meta.requestId;
          state.isLoading = true;
        },
      )
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.isLoading && state.currentRequestId === action.meta.requestId) {
            state.isLoading = false;
            state.currentRequestId = undefined;
            state.error = null;
          }
        },
      )
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          if (state.isLoading && state.currentRequestId === action.meta.requestId) {
            state.isLoading = false;
            state.currentRequestId = undefined;
          }
          state.error = action.payload;
        },
      );
  },
});

export const { sendMsg } = messageSlice.actions;
export default messageSlice.reducer;
