import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { driverApi } from "./api/driverApi";
import { raceApi } from "./api/raceApi";
import { seasonApi } from "./api/seasonApi";
import { standingsApi } from "./api/standingsApi";

const reducers = combineReducers({
  [driverApi.reducerPath]: driverApi.reducer,
  [raceApi.reducerPath]: raceApi.reducer,
  [seasonApi.reducerPath]: seasonApi.reducer,
  [standingsApi.reducerPath]: standingsApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(driverApi.middleware)
      .concat(seasonApi.middleware)
      .concat(raceApi.middleware)
      .concat(standingsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
