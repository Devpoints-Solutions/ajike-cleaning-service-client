import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_FORM_URL;

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    submitMessage: builder.mutation({
      query: (payload) => ({
        url: "/submit",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useSubmitMessageMutation } = contactApi;
