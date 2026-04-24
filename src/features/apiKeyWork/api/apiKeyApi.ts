import { baseApi } from "@/shared/api/baseApi";
import { ApiKeyCopy, ApiKeyCreate } from "@/features/apiKeyWork/api/types";
import { ApiKey } from "@/entities/apiKey/model/types";

export const apiKeyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createApiKey: builder.mutation<ApiKeyCopy, ApiKeyCreate>({
      query: (data) => ({
        url: "/api-keys",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiKeyCopy) => response,
      transformErrorResponse: (error) => {
        if (error.status === 400) {
          return "Ошибка валидации данных";
        }
        if (error.status === 401) {
          return "Пользователь не авторизован";
        }
        if (error.status === 403) {
          return "Недостаточно прав для создания ключа в этом проекте";
        }
        if (error.status === 404) {
          return "Проект не найден";
        }
        return "Внутренняя ошибка сервера, повторите попытку позже";
      },
      invalidatesTags: ["ApiKeys"],
    }),
    getApiKeys: builder.query<ApiKey[], string>({
      query: (projectId) => ({
        url: `/api-keys?projectId=${projectId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiKey[]) => response,
      transformErrorResponse: (error) => {
        if (error.status === 400) {
          return "Ошибка валидации данных";
        }
        if (error.status === 401) {
          return "Пользователь не авторизован";
        }
        if (error.status === 403) {
          return "Недостаточно прав для просмотра ключей проекта";
        }
        if (error.status === 404) {
          return "Проект не найден";
        }
        return "Внутренняя ошибка сервера, повторите попытку позже";
      },
      providesTags: ["ApiKeys"],
    }),
    deleteApiKey: builder.mutation<void, string>({
      query: (keyId) => ({
        url: `/api-keys/${keyId}`,
        method: "DELETE",
      }),
      transformErrorResponse: (error) => {
        if (error.status === 401) {
          return "Пользователь не авторизован";
        }
        if (error.status === 403) {
          return "Недостаточно прав для отзыва ключа";
        }
        if (error.status === 404) {
          return "API ключ не найден";
        }
        return "Внутренняя ошибка сервера, повторите попытку позже";
      },
      invalidatesTags: ["ApiKeys"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateApiKeyMutation,
  useGetApiKeysQuery,
  useDeleteApiKeyMutation,
} = apiKeyApi;
