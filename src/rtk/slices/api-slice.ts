import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.aladhan.com/v1",
  }),
  endpoints: (builder) => ({
    getTimingsByCity: builder.query({
      query: (city) => `/timingsByCity?country=EG&city=${city}`,
    }),
  }),
});

export const { useGetTimingsByCityQuery } = apiSlice;
