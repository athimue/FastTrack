import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DriverStandingsReponse as DriverStandingsResponse } from "../../types/driverStandings";
import { ConstructorStandingsReponse as ConstructorStandingsResponse } from "../../types/constructorStandings";

export const currentStandingsApi = createApi({
  reducerPath: "standingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ergast.com/api/f1/",
  }),
  endpoints: (builder) => ({
    getCurrentDriverStandings: builder.query<DriverStandingsResponse, null>({
      query: () => ({
        url: "current/driverstandings.json",
        method: "get",
      }),
    }),
    getCurrentConstructorStandings: builder.query<ConstructorStandingsResponse, null>({
      query: () => ({
        url: "current/constructorstandings.json",
        method: "get",
      }),
    }),
  }),
});

export const { useGetCurrentDriverStandingsQuery, useGetCurrentConstructorStandingsQuery } = currentStandingsApi;
