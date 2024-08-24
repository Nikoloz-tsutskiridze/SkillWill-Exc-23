import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./features/itemsSlice";
import themeReducer from "./features/themeSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
