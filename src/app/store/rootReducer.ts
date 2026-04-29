import { combineReducers } from "redux";
import { authSlice } from "@/features/userAuth/model/authSlice";
import { baseApi } from "@/shared/api/baseApi";
import { projectsWorkSlice } from "@/features/projectWork/model/projectsWorkSlice";
import { logsWorkSlice } from "@/features/logWork/model/logsWorkSlice";
import { setLogout } from "@/features/userAuth/model/authSlice";

const appReducer = combineReducers({
  auth: authSlice.reducer,
  projectsWork: projectsWorkSlice.reducer,
  logsWork: logsWorkSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: { type: string },
) => {
  if (action.type === setLogout.type) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
