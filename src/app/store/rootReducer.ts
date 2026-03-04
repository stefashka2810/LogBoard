import { combineReducers } from "redux";
import { authSlice } from "@/features/userAuth/model/authSlice";
import { authApi } from "@/features/userAuth/api/authApi";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
