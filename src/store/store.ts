import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { driverApi } from "./api/driverApi";
import { currentSeasonApi } from "./api/seasonApi";

const reducers = combineReducers({
  [driverApi.reducerPath]: driverApi.reducer,
  [currentSeasonApi.reducerPath]: currentSeasonApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(driverApi.middleware)
      .concat(currentSeasonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
