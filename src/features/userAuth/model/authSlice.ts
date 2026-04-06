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
      console.log("[AUTH] setAuth dispatched with:", action.payload);
      state.isAuth = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      console.log("[AUTH] After setAuth - accessToken:", state.accessToken ? "✓ Set" : "✗ Null");
    },

    setRefreshToken: (state, action) => {
      console.log("[AUTH] setRefreshToken called");
      state.accessToken = action.payload.accessToken;
    },

    setLogout: (state) => {
      console.log("[AUTH] setLogout called");
      state.isAuth = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setAuth, setLogout, setRefreshToken } = authSlice.actions;
