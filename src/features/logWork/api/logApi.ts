import { baseApi } from "@/shared/api/baseApi";
import {
  LogSearchRequest,
  LogSearchResponse,
  LogTimelineRequest,
  LogTimelineResponse,
} from "@/features/logWork/api/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  getMockLogsTimeline,
  logsMockModeEnabled,
  searchMockLogs,
} from "@/features/logWork/api/mockLogs";

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

const toBaseQueryError = (error: FetchBaseQueryError): FetchBaseQueryError => ({
  status: "CUSTOM_ERROR",
  error: transformLogsError(error),
  data: null,
});

export const logApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchLogs: builder.mutation<LogSearchResponse, LogSearchRequest>({
      queryFn: async (body, _api, _extraOptions, baseQuery) => {
        if (logsMockModeEnabled) {
          return { data: searchMockLogs(body) };
        }

        const result = await baseQuery({
          url: "/logs/search",
          method: "POST",
          body,
        });

        if ("error" in result && result.error) {
          return { error: toBaseQueryError(result.error as FetchBaseQueryError) };
        }

        return { data: result.data as LogSearchResponse };
      },
      invalidatesTags: ["Logs"],
    }),

    getLogsTimeline: builder.query<LogTimelineResponse, LogTimelineRequest>({
      queryFn: async (body, _api, _extraOptions, baseQuery) => {
        if (logsMockModeEnabled) {
          return { data: getMockLogsTimeline(body) };
        }

        const result = await baseQuery({
          url: "/logs/timeline",
          method: "POST",
          body,
        });

        if ("error" in result && result.error) {
          return { error: toBaseQueryError(result.error as FetchBaseQueryError) };
        }

        return { data: result.data as LogTimelineResponse };
      },
      providesTags: ["Logs"],
    }),
  }),
  overrideExisting: true,
});

export const { useSearchLogsMutation, useGetLogsTimelineQuery } = logApi;
