import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceState } from "@/features/userAuth/model/types";

const initialAuthState: AuthSliceState = {
  isAuth: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    setRefreshToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },

    setLogout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setAuth, setLogout, setRefreshToken } = authSlice.actions;
