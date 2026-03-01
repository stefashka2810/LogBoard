import { ErrorResponse } from "@/shared/api/types";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface FetchErrorResponse {
  status: number;
  data: ErrorResponse;
  statusText: string;
}
