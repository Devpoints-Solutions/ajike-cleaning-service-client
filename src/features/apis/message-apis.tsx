import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const messageApis = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    getMessagesByUser: builder.mutation({
      query: (payload) => ({
        url: `/messages/user?page=${payload}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllRooms: builder.mutation({
      query: (payload) => ({
        url: `/messages/rooms?page=${payload}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getMessagesByRoom: builder.mutation({
      query: ({ page, room }) => ({
        url: `/messages/rooms/${room}/messages?page=${page}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllRoomsMutation,
  useGetMessagesByRoomMutation,
  useGetMessagesByUserMutation,
} = messageApis;
