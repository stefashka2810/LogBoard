import { User } from "@/entities/user/model/types";

export interface AuthSliceState {
  isAuth: boolean;
  user: null | User;
  accessToken: null | string;
  refreshToken: null | string;
}
