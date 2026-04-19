import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceState } from "@/features/userAuth/model/types";

const initialAuthState: AuthSliceState = {
  isAuth: false,
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = true;
      state.username = action.payload.username;
    },

    setLogout: (state) => {
      state.isAuth = false;
      state.username = "";
    },
  },
});

export const { setAuth, setLogout } = authSlice.actions;
