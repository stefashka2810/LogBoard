import { baseApi } from "@/shared/api/baseApi";
import { User } from "@/entities/user/model/types";
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
        if (error.status === 400) {
          return "Введите корректные пользовательские данные";
        }
        if (error.status === 409) {
          return "Пользователь с таким username уже существует";
        }
        return "Внутренняя ошибка сервера, повторите попытку позже";
      },
    }),

    loginUser: builder.mutation<void, User>({
      query: (userData: User) => ({
        url: "/login",
        body: userData,
        method: "POST",
      }),
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === 400) {
          return "Введите корректные пользовательские данные";
        }
        if (error.status === 401) {
          return "Неверный username или пароль";
        }
        return "Внутренняя ошибка сервера, повторите попытку позже";
      },
    }),

    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      transformErrorResponse: () => {
        return "Внутренняя ошибка сервера, повторите попытку позже";
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
