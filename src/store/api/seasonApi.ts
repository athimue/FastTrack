import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SeasonResponse } from "../../types/season";
import { RaceResponse } from "../../types/races";

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
    getSeasonRaceResult: builder.query<RaceResponse, string>({
      query: (id) => ({
        url: `current/${id}/results.json`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetCurrentSeasonQuery, useGetSeasonRaceResultQuery } = seasonApi;
