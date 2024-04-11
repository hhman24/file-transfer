import { apiSlice } from '~/apis/apiSlice';

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id, page = 1, limit = 10, date) => `/message/${id}?page=${page}&limit=${limit}&date=${date}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetMessagesQuery } = messageApiSlice;
