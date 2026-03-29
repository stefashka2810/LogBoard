import { combineReducers } from "redux";
import { authSlice } from "@/features/userAuth/model/authSlice";
import { baseApi } from "@/shared/api/baseApi";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
