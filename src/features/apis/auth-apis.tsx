import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "@/features/redux/auth-slice";

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
      }),

      async onQueryStarted(__, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCurrentUser(data.data?.user));
        } catch (error) {
          // console.log(error);
        }
      },
    }),

    requestPasswordReset: builder.mutation({
      query: (payload) => ({
        url: `/users/password/reset`,
        method: "POST",
        body: payload,
      }),
    }),

    updatePassword: builder.mutation({
      query: (payload) => ({
        url: `/users/password/reset/update`,
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
} = authApis;
