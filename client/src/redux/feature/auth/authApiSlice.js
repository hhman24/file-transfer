import { apiSlice } from '~/apis/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth',
        method: 'POST',
        body: { ...body },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
