import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAxios } from '~/apis/axiosConfig';
import { generateKey } from '~/utils/generateKey';

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
  pageNum: 1,
  newMsg: null,
};

export const getMsg = createAsyncThunk(
  'message/getMsg',
  async ({ id, page = 1, limit = 10, date, keyAES }, thunkAPI) => {
    try {
      const state = thunkAPI.getState().auth.loginState;

      if (!keyAES) throw new Error('No key AES');

      const axios = useAxios(state.token, thunkAPI.dispatch);
      const res = await axios.get(`/message/${id}`, {
        params: { page: page, limit: limit, date: date },
        signal: thunkAPI.signal,
      });

      if (res.data.results.length < 1) return [];

      // decrypt msg here
      const messages = res.data.results.map((msg) => {
        const content = generateKey.decryptData(msg.content, keyAES);
        return { ...msg, content: content };
      });

      // return res.data.results;
      return messages;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  },
);

const messageSlice = createSlice({
  initialState,
  name: 'message',
  reducers: {
    reSetStateMsg: (state) => {
      state.message = [];
      state.metaData = null;
      state.isLoading = false;
      state.error = null;
      state.newMsg = null;
      state.pageNum = 1;
    },
    sendMsg: (state, action) => {
      state.message.push(action.payload);
      state.newMsg = action.payload;
    },
    setNewMsg: (state, action) => {
      state.newMsg = action.payload;
    },
    setPageNum: (state) => {
      state.pageNum += 1;
    },
    reSetPageNum: (state) => {
      state.pageNum = 1;
    },
    updateMsg: (state, action) => {
      const id = state.message.findIndex((m) => m.conversation === action.payload.conversation);
      state.message[id] = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMsg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMsg.fulfilled, (state, action) => {
        state.message = [...action.payload.reverse(), ...state.message];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMsg.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { sendMsg, setNewMsg, reSetStateMsg, updateMsg, setPageNum, reSetPageNum } = messageSlice.actions;
export default messageSlice.reducer;
