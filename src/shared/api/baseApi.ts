import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setLogout } from "@/features/userAuth/model/authSlice";

const PUBLIC_URLS = ["/register", "/login"];

const fetchWithManualLogoutRedirect: typeof fetch = async (input, init) => {
  const request = typeof input === "string" ? new Request(input, init) : input;
  const requestUrl =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.toString()
        : input.url;

  if (requestUrl.includes("/logout")) {
    return fetch(new Request(request, { ...init, redirect: "manual" }));
  }

  return fetch(request, init);
};

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "http://155.212.165.128:8080"
      : "/api",
  fetchFn: fetchWithManualLogoutRedirect,
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    return headers;
  },
  credentials: "include",
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
        url: "/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("[API] Refresh failed:", refreshResult.error);
      api.dispatch(setLogout());
      await baseQuery(
        {
          url: "/logout",
          method: "POST",
        },
        api,
        extraOptions,
      );
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "base",
  baseQuery: fetchBaseQueryWithAuth,
  tagTypes: ["Projects"],
  endpoints: () => ({}),
});
