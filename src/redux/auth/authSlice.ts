import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSessionUser } from "@/redux/auth/authApi";

export type AuthState = {
  user: AuthSessionUser | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthSessionUser | null>) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
