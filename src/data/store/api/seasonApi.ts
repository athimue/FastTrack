import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SeasonResponse } from "../../network/dto/season";
import { RaceResponse } from "../../network/dto/RaceDto";
import { CircuitsResponse } from "../../network/dto/CircuitDto";

export const seasonApi = createApi({
  reducerPath: "seasonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ergast.com/api/f1/",
  }),
  endpoints: (builder) => ({
    getCurrentSeason: builder.query<SeasonResponse, string>({
      query: (season) => ({
        url: `${season}.json`,
        method: "get",
      }),
    }),
    getSeasonRaceResult: builder.query<RaceResponse, { season: string; raceId: string }>({
      query: ({ season, raceId }) => ({
        url: `${season}/${raceId}/results.json`,
        method: "get",
      }),
    }),
    getSeasonCircuits: builder.query<CircuitsResponse, string>({
      query: (id) => ({
        url: `${id}/circuits.json`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetCurrentSeasonQuery, useGetSeasonRaceResultQuery, useGetSeasonCircuitsQuery } = seasonApi;
