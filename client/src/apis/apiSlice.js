import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLogin, setLogout } from '~/redux/feature/auth/authSlice';

export const BASE_API_URL = import.meta.env.VITE_API_URL;

// dùng createSlice để tạo slice thì bên RTK query dùng createApi
// Với createApi chúng ta gọi là slice api
// Chúng ta sẽ khai báo baseUrl và các endpoints

// baseQuery được dùng cho mỗi endpoint để fetch api

// fetchBaseQuery là một function nhỏ được xây dựng trên fetch API
// Nó không thay thế hoàn toàn được Axios nhưng sẽ giải quyết được hầu hết các vấn đề của bạn
// Chúng ta có thể dùng axios thay thế cũng được, nhưng để sau nhé

// endPoints là tập hợp những method giúp get, post, put, delete... tương tác với server
// Khi khai báo endPoints nó sẽ sinh ra cho chúng ta các hook tương ứng để dùng trong component
// endpoints có 2 kiểu là query và mutation.
// Query: Thường dùng cho GET
// Mutation: Thường dùng cho các trường hợp thay đổi dữ liệu trên server như POST, PUT, DELETE

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.loginState.token;
    if (token !== '') {
      headers.set('accessToken', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  var result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');
    // send refresh token to get new acess token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);

    if (refreshResult?.data) {
      // const user = api.getState().auth.sLogin.userInfo;
      // store the new token
      api.dispatch(setLogin({ ...refreshResult.data }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // should rest all state here !!
      api.dispatch(setLogout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
