import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const serviceApis = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    requestNewService: builder.mutation({
      query: (payload) => ({
        url: "/services",
        method: "POST",
        credentials: "include",
        body: payload,
      }),
    }),
    getAllServices: builder.mutation({
      query: (payload) => ({
        url: `/services/admin?page=${payload}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getServicesByUser: builder.mutation({
      query: () => ({
        url: `/services/user`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getNewServicesByUser: builder.mutation({
      query: (payload) => ({
        url: `/services/user?page=${payload}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    sendFeedback: builder.mutation({
      query: (payload) => ({
        url: `/services/${payload?.serviceId}/feeback`,
        method: "POST",
        body: payload?.serviceData,
        credentials: "include",
      }),
    }),

    getAllFeeback: builder.mutation({
      query: (payload) => ({
        url: `/services/feedback?page=${payload}`,
        method: "GET",
      }),
    }),

    updateService: builder.mutation({
      query: (payload) => ({
        url: `/services/${payload?.serviceId}`,
        method: "PUT",
        body: payload?.serviceData,
        credentials: "include",
      }),
    }),

    getCompletedServicesByUser: builder.mutation({
      query: () => ({
        url: "/services/user/completed-services",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRequestNewServiceMutation,
  useGetAllServicesMutation,
  useGetServicesByUserMutation,
  useSendFeedbackMutation,
  useGetAllFeebackMutation,
  useUpdateServiceMutation,
  useGetNewServicesByUserMutation,
  useGetCompletedServicesByUserMutation,
} = serviceApis;
