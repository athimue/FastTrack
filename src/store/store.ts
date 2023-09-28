import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { driverApi } from "./api/driverApi";
import { currentSeasonApi } from "./api/seasonApi";
import { currentStandingsApi } from "./api/standingsApi";

const reducers = combineReducers({
  [driverApi.reducerPath]: driverApi.reducer,
  [currentSeasonApi.reducerPath]: currentSeasonApi.reducer,
  [currentStandingsApi.reducerPath]: currentStandingsApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(driverApi.middleware)
      .concat(currentSeasonApi.middleware)
      .concat(currentStandingsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
