import { baseApi } from "@/shared/api/baseApi";
import {
  LogSearchRequest,
  LogSearchResponse,
  LogTimelineRequest,
  LogTimelineResponse,
} from "@/features/logWork/api/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const transformLogsError = (error: FetchBaseQueryError) => {
  const status =
    typeof error.status === "number"
      ? error.status
      : "originalStatus" in error &&
          typeof error.originalStatus === "number"
        ? error.originalStatus
        : null;

  if (status === 400) {
    return "Проверьте параметры фильтрации логов";
  }
  if (status === 401) {
    return "Пользователь не авторизован";
  }
  if (status === 403) {
    return "У вас нет доступа к логам этого проекта";
  }
  if (status === 404) {
    return "Проект не найден";
  }

  if (error.status === "FETCH_ERROR") {
    return "Ошибка сети. Проверьте соединение и повторите попытку.";
  }

  return "Не удалось загрузить логи. Повторите попытку позже.";
};

export const logApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchLogs: builder.mutation<LogSearchResponse, LogSearchRequest>({
      query: (body) => ({
        url: "/logs/search",
        method: "POST",
        body,
      }),
      transformErrorResponse: transformLogsError,
      invalidatesTags: ["Logs"],
    }),

    getLogsTimeline: builder.query<LogTimelineResponse, LogTimelineRequest>({
      query: (body) => ({
        url: "/logs/timeline",
        method: "POST",
        body,
      }),
      transformErrorResponse: transformLogsError,
      providesTags: ["Logs"],
    }),
  }),
  overrideExisting: true,
});

export const { useSearchLogsMutation, useGetLogsTimelineQuery } = logApi;
