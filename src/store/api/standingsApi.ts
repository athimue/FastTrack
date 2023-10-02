import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DriverStandingsReponse as DriverStandingsResponse } from "../../types/driverStandings";
import { ConstructorStandingsReponse as ConstructorStandingsResponse } from "../../types/constructorStandings";

export const currentStandingsApi = createApi({
  reducerPath: "standingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ergast.com/api/f1/",
  }),
  endpoints: (builder) => ({
    getCurrentDriverStandings: builder.query<DriverStandingsResponse, string>({
      query: (season: string) => ({
        url: `${season}/driverstandings.json`,
        method: "get",
      }),
    }),
    getCurrentConstructorStandings: builder.query<ConstructorStandingsResponse, string>({
      query: (season: string) => ({
        url: `${season}/constructorstandings.json`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetCurrentDriverStandingsQuery, useGetCurrentConstructorStandingsQuery } = currentStandingsApi;
