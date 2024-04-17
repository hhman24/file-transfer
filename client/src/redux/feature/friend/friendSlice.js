import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAxios } from '~/apis/axiosConfig';
import { generateKey } from '~/utils/generateKey';

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
  listNotFriend: [],
  notify: [],
  selectedChat: undefined,
  isLoading: false,
  error: null,
};

export const getListFriends = createAsyncThunk('friend/getListFriends', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth.loginState;
    const axios = useAxios(state.token, thunkAPI.dispatch);
    const res = await axios.get(`/friend/getAll`, { signal: thunkAPI.signal });

    // get key aes
    const friends = res.data.friends.map((f) => {
      const enPublicKey = f.userA === state.userInfo._id ? f.enPrivateKeyA : f.enPrivateKeyB;
      const keyAES = generateKey.decryptAESKey(atob(enPublicKey), atob(state.privateKey));
      if (!f.lastMessage) return { ...f, keyAES: btoa(keyAES) };

      // console.log(f.lastMessage.content);
      // console.log(keyAES);

      const decryptContent = generateKey.decryptData(f.lastMessage.content, keyAES);
      // console.log(decryptContent);

      return { ...f, keyAES: btoa(keyAES), lastMessage: { ...f.lastMessage, content: decryptContent } };
    });

    return friends;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const getListNotFriend = createAsyncThunk('friend/getListNotFriend', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState().auth.loginState;
    const axios = useAxios(state.token, thunkAPI.dispatch);
    const res = await axios.get(`/friend/getUnFriends`, { signal: thunkAPI.signal });
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
    reSetStateFriend: (state) => {
      state.listFriend = [];
      state.listNotFriend = [];
      state.notify = [];
      state.selectedChat = undefined;
      state.isLoading = false;
      state.error = null;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      console.log('selected chat', state.selectedChat);
    },
    receiveRequest: (state, action) => {
      const req = action.payload;
      const id = state.listNotFriend.findIndex((u) => {
        if (!u.conversation) {
          if (u._id.toString() === req.userA.toString() || u._id.toString() === req.userB.toString()) return u;
        }
      });
      if (id < 0) return;
      state.listNotFriend[id].conversation = req;
      if (state.listNotFriend[id]._id === req.userA) {
        state.notify.push({
          message: `${state.listNotFriend[id].username} has sent you a friend request.`,
          createAt: req.createAt,
        });
      }
    },
    acceptRequest: (state, action) => {
      state.listFriend.unshift(action.payload);
      const res = state.listNotFriend.filter((f) => {
        return !f.conversation || f.conversation._id !== action.payload._id;
      });
      state.listNotFriend = res;

      if (action.payload.userB === action.payload.friend._id) {
        state.notify.push({
          message: `${action.payload.friend.username} has accepted your request.`,
          createAt: action.payload.createAt,
        });
      }
    },
    setLastMessageSelectedChat: (state, action) => {
      const id = state.listFriend.findIndex((m) => m._id === action.payload.conversation);
      state.listFriend[id].lastMessage = id < 0 ? null : action.payload;
    },
    setReadLastMessage: (state, action) => {
      const id = state.listFriend.findIndex((m) => m._id === action.payload.conversation);
      if (id < 0) return;
      state.listFriend[id].lastMessage._unread = action.payload._unread;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListFriends.fulfilled, (state, action) => {
        state.listFriend = action.payload;
        // state.selectedChat = state.listFriend.length > 0 ? state.listFriend[0] : undefined;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getListFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getListNotFriend.fulfilled, (state, action) => {
        state.listNotFriend = action.payload.users;
        // state.selectedChat = state.listFriend.length > 0 ? state.listFriend[0] : undefined;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getListNotFriend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(acceptFriend.fulfilled, (state, action) => {
        state.listFriend.unshift(action.payload);
      });
  },
});

export const {
  setSelectedChat,
  reSetStateFriend,
  receiveRequest,
  acceptRequest,
  setLastMessageSelectedChat,
  setReadLastMessage,
} = friendSlice.actions;
export default friendSlice.reducer;
