import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const userApis = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    getAllRegisteredUsers: builder.mutation({
      query: (payload) => ({
        url: `/users?page=${payload}`,
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
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/users/profile/update",
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
    }),

    updateUserProfile: builder.mutation({
      query: (payload) => ({
        url: `/users/profile/${payload.userId}/update`,
        method: "PUT",
        body: payload.userData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetProfileMutation,
  useGetAllRegisteredUsersMutation,
  useUpdateProfileMutation,
  useUpdateUserProfileMutation,
} = userApis;
