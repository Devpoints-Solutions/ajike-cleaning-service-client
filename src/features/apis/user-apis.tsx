import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const userApis = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    getAllRegisteredUsers: builder.mutation({
      query: () => ({
        url: "/users",
        method: "GET",
        credentials: "include",
      }),
    }),
    getProfile: builder.mutation({
      query: () => ({
        url: "/users/profile",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetProfileMutation, useGetAllRegisteredUsersMutation } =
  userApis;
