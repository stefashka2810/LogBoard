import { baseApi } from "@/shared/api/baseApi";
import { User } from "@/entities/user/model/types";
import { LoginResponse } from "@/features/userAuth/api/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, User>({
      query: (userData: User) => ({
        url: "/register",
        body: userData,
        method: "POST",
      }),
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === "FETCH_ERROR") {
          return "Сервер недоступен. Проверьте подключение";
        }
        if (
          error.status !== "PARSING_ERROR" &&
          error.status !== "TIMEOUT_ERROR" &&
          error.status !== "CUSTOM_ERROR"
        ) {
          const data = error.data as { error?: string } | undefined;
          if (data?.error) return data.error;
        }
        return "Произошла ошибка";
      },
    }),

    loginUser: builder.mutation<LoginResponse, User>({
      query: (userData: User) => ({
        url: "/login",
        body: userData,
        method: "POST",
      }),
      transformResponse: (response: LoginResponse) => response,
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === "FETCH_ERROR") {
          return "Сервер недоступен. Проверьте подключение";
        }
        if (
          error.status !== "PARSING_ERROR" &&
          error.status !== "TIMEOUT_ERROR" &&
          error.status !== "CUSTOM_ERROR"
        ) {
          const data = error.data as { error?: string } | undefined;
          if (data?.error) return data.error;
        }
        return "Произошла ошибка";
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
