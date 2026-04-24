import { combineReducers } from "redux";
import { authSlice } from "@/features/userAuth/model/authSlice";
import { baseApi } from "@/shared/api/baseApi";
import { projectsWorkSlice } from "@/features/projectWork/model/projectsWorkSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  projectsWork: projectsWorkSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
