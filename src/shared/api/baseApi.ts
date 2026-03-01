import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseApi = createApi({
  reducerPath: "base",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
    },
  }),
  endpoints: () => ({}),
});
