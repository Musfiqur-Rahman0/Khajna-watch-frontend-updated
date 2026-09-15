import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type WatchlistState = {
  codes: string[];
};

const initialState: WatchlistState = {
  codes: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<string[]>) {
      state.codes = action.payload;
    },
    toggleWatch(state, action: PayloadAction<string>) {
      const code = action.payload.trim().toLowerCase();
      if (!code) return;
      const exists = state.codes.some((c) => c.trim().toLowerCase() === code);
      if (exists) {
        state.codes = state.codes.filter(
          (c) => c.trim().toLowerCase() !== code,
        );
      } else {
        state.codes = [...state.codes, code];
      }
    },
  },
});

export const { hydrate, toggleWatch } = watchlistSlice.actions;
export default watchlistSlice.reducer;
