import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "@/features/redux/auth-slice";

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
      }),
    }),
    getAdminProfile: builder.mutation({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      async onQueryStarted(__, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // console.log(data?.data);
          dispatch(setCurrentUser(data.data));
        } catch (error) {
          // console.log(error);
        }
      },
    }),
  }),
});

export const { useGetAdminProfileMutation, useGetAllRegisteredUsersMutation } =
  userApis;
