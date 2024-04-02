import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const Fetcher = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/',
  }),
  endpoints: builder => ({
    resetPassword: builder.mutation({
      query: body => ({
        url: `customer/reset-password`,
        method: 'POST',
        body,
      }),
    }),
    createUser: builder.mutation({
      query: body => ({
        url: `customer`,
        method: 'POST',
        body,
      }),
    }),
    loginUser: builder.mutation({
      query: body => ({
        url: `customer/login`,
        method: 'POST',
        body,
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: body => ({
        url: `customer/password-update`,
        method: 'POST',
        body,
      }),
    }),
    googleAuth: builder.mutation({
      query: body => ({
        url: `customer/googleAuth`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default Fetcher;
export const {
  useResetPasswordMutation,
  useCreateUserMutation,
  useLoginUserMutation,
  useResetPasswordConfirmMutation,
  useGoogleAuthMutation,
} = Fetcher;
