// redux state management stool
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '~/apis/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import friendSlice from './feature/friend/friendSlice';
import authSlice from './feature/auth/authSlice';

export const store = configureStore({
  reducer: {
    friends: friendSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Thêm api middleware để enable các tính năng như caching, invalidation, polling của rtk-query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(apiSlice.middleware),
  devTools: true,
});

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
