import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DriverStandingsReponse as DriverStandingsResponse } from "../../network/dto/driverStandings";
import { ConstructorStandingsReponse as ConstructorStandingsResponse } from "../../network/dto/constructorStandings";

export const standingsApi = createApi({
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

export const { useGetCurrentDriverStandingsQuery, useGetCurrentConstructorStandingsQuery } = standingsApi;
