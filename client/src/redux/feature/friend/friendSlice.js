import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAxios } from '~/apis/axiosConfig';

/**
 * @type listFriend: [
 * _id: uuid
 * enPrivateKey: string
 * status: enums [FRIEND_STATUS]
 * createAt: date
 * updateAt: date
 * lastMessage: Message
 * friend: user
 */

const initialState = {
  listFriend: [],
  selectedChat: undefined,
  isLoading: false,
  error: null,
  currentRequestId: undefined,
};

export const getListFriends = createAsyncThunk('friend/getListFriends', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth.loginState;
    const axios = useAxios(state.token, thunkAPI.dispatch);
    const res = await axios.get(`/friend/getAll`, { signal: thunkAPI.signal });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const addFriend = createAsyncThunk('friend/addFriend', async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth.loginState;
    const axios = useAxios(state.token, thunkAPI.dispatch);
    const res = await axios.post(`/friend/add/${id}`, { signal: thunkAPI.signal });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const acceptFriend = createAsyncThunk('friend/acceptFriend', async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth.loginState;
    const axios = useAxios(state.token, thunkAPI.dispatch);
    const res = await axios.patch(`/friend/accept/${id}`, { signal: thunkAPI.signal });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

const friendSlice = createSlice({
  initialState,
  name: 'friend',
  reducers: {
    // addFriend: (state, action) => {
    //   state.listFriend.unshift(action.payload);
    // },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListFriends.fulfilled, (state, action) => {
        state.listFriend = action.payload.friends;
        state.selectedChat = state.listFriend.length > 0 ? state.listFriend[0] : undefined;
      })
      .addCase(acceptFriend.fulfilled, (state, action) => {
        state.listFriend.unshift(action.payload);
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

export const { setSelectedChat } = friendSlice.actions;
export default friendSlice.reducer;
