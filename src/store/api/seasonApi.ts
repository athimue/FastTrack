import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CurrentSeasonResponse } from "../../types/season";

export const currentSeasonApi = createApi({
  reducerPath: "seasonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ergast.com/api/f1/",
  }),
  endpoints: (builder) => ({
    getCurrentSeason: builder.query<CurrentSeasonResponse, null>({
      query: () => ({
        url: "current.json",
        method: "get",
      }),
    }),
  }),
});

export const { useGetCurrentSeasonQuery } = currentSeasonApi;
