import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type LangState = {
  lang: "en" | "bn";
};

const initialState: LangState = {
  lang: "en",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<"en" | "bn">) {
      state.lang = action.payload;
    },
    toggleLang(state) {
      state.lang = state.lang === "en" ? "bn" : "en";
    },
  },
});

export const { setLang, toggleLang } = langSlice.actions;
export default langSlice.reducer;
