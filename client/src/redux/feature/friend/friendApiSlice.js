import { apiSlice } from '~/apis/apiSlice';

export const useFriendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriends: builder.query({
      query: () => '/friends',
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetFriendsQuery } = useFriendApiSlice;
