import { baseApi } from "@/shared/api/baseApi";
import { User } from "@/entities/user/model/types";
import { FetchErrorResponse, LoginResponse } from "@/features/auth/api/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, User>({
      query: (userData: User) => ({
        url: "/register",
        body: userData,
        method: "POST",
      }),
      transformErrorResponse: (error: FetchErrorResponse) => {
        if (error.data) {
          return error.data.error;
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
      transformErrorResponse: (error: FetchErrorResponse) => {
        if (error.data) {
          return error.data.error;
        }
        return "Произошла ошибка";
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
