import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DriverResponse } from "../../network/dto/DriverDto";

export const driverApi = createApi({
  reducerPath: "driverApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ergast.com/api/f1",
  }),
  endpoints: (builder) => ({
    getAllDrivers: builder.query<DriverResponse, null>({
      query: () => ({
        url: "/drivers.json",
        method: "get",
      }),
    }),
  }),
});

export const { useGetAllDriversQuery } = driverApi;
