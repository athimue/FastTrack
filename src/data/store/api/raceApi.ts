import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RaceResponse } from "../../network/dto/RaceDto";

export const raceApi = createApi({
  reducerPath: "raceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ergast.com/api/f1/",
  }),
  endpoints: (builder) => ({
    getNextRace: builder.query<RaceResponse, null>({
      query: () => ({
        url: "current/next.json",
        method: "get",
      }),
    }),
    getLastRace: builder.query<RaceResponse, null>({
      query: () => ({
        url: "current/last/results.json",
        method: "get",
      }),
    }),
  }),
});

export const { useGetNextRaceQuery, useGetLastRaceQuery } = raceApi;
