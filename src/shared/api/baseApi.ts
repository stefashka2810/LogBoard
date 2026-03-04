import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  setLogout,
  setRefreshToken,
} from "@/features/userAuth/model/authSlice";
import { store } from "@/app/store/store";
import { RefreshResponse } from "@/shared/api/types";

const PUBLIC_ENDPOINTS = ["registerUser", "loginUser"];
const PUBLIC_URLS = ["/register", "/login"];

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers, { endpoint }) => {
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    const isPublic = PUBLIC_ENDPOINTS.includes(endpoint);
    if (!isPublic) {
      const token = store.getState().auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  },
});

const fetchBaseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const url = typeof args === "string" ? args : args.url;
  const isPublic = PUBLIC_URLS.some((endpoint) => url.includes(endpoint));

  if (!isPublic && result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/refresh-token",
        method: "POST",
        body: { refresh_token: store.getState().auth.refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const data = refreshResult.data as RefreshResponse;
      api.dispatch(setRefreshToken(data.access_token));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setLogout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "base",
  baseQuery: fetchBaseQueryWithAuth,
  endpoints: () => ({}),
});
