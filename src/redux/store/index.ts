import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { baseApi } from "@/redux/api/baseApi";
import authReducer from "@/redux/auth/authSlice";
import langReducer from "@/redux/lang/langSlice";
import watchlistReducer from "@/redux/watchlist/watchlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lang: langReducer,
    watchlist: watchlistReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Enables refetchOnFocus/refetchOnReconnect behavior for RTK Query.
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
