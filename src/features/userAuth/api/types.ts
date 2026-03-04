import { ErrorResponse } from "@/shared/api/types";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface FetchErrorResponse {
  status:
    | number
    | "FETCH_ERROR"
    | "PARSING_ERROR"
    | "TIMEOUT_ERROR"
    | "CUSTOM_ERROR";
  data: ErrorResponse;
  statusText: string;
}
