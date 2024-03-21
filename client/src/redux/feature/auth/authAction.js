import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '~/apis/axiosConfig';

export const registerUser = createAsyncThunk('auth/register', async (body, thunkAPI) => {
  try {
    const res = await axiosInstance.post(`/auth/signup`, body, { signal: thunkAPI.signal });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
