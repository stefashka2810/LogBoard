import { ErrorResponse } from "@/shared/api/types";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
