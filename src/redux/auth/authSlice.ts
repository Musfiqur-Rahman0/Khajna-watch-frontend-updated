import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSessionUser } from "@/redux/auth/authApi";

export type AuthState = {
  user: AuthSessionUser | null;
  accessToken: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: AuthSessionUser; accessToken: string } | null>) {
      if (action.payload) {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      } else {
        state.user = null;
        state.accessToken = null;
      }
    },
    logoutUser(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
