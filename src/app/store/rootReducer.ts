import { combineReducers } from "redux";
import { authSlice } from "@/features/auth/model/authSlice";
import { authApi } from "@/features/auth/api/authApi";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
