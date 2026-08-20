import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const authApis = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
      }),
    }),

    verifyAccount: builder.mutation({
      query: (payload) => ({
        url: "/users/verify",
        method: "PATCH",
        body: payload,
      }),
    }),

    loginAccount: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
    }),

    logoutAccount: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    requestPasswordReset: builder.mutation({
      query: (payload) => ({
        url: `/users/reset-password`,
        method: "PATCH",
        body: payload,
      }),
    }),

    updatePassword: builder.mutation({
      query: (payload) => ({
        url: `/users/update-password`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useVerifyAccountMutation,
  useLoginAccountMutation,
  useRequestPasswordResetMutation,
  useUpdatePasswordMutation,
  useLogoutAccountMutation,
} = authApis;
