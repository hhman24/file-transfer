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
  metaData: null,
  isLoading: false,
  error: null,
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
    reSetStateMsg: (state) => {
      state.message = [];
      state.metaData = null;
      state.isLoading = false;
      state.error = null;
    },
    sendMsg: (state, action) => {
      state.message.push(action.payload);
    },
    updateMsg: (state, action) => {
      const id = state.message.findIndex((m) => m.conversation === action.payload.conversation);

      if (!id) {
        console.log(state.message);
        console.log(action.payload);
        console.log(id);
      }

      state.message[id] = action.payload;
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetMetaData: (state) => {
      state.metaData = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMsg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMsg.fulfilled, (state, action) => {
        state.message = action.payload.results.reverse();
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMsg.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { sendMsg, reSetStateMsg, updateMsg, setMetaData, resetMetaData } = messageSlice.actions;
export default messageSlice.reducer;
