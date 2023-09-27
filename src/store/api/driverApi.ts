import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DriverResponse } from "../../types/driver";

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

//  getOneDriver: builder.query<Driver, string>({
//    query: (id) => ({
//      url: `/${id}`,
//      method: "get",
//    }),
//    transformResponse: (response: DriverResponse) => response?.MRData?.DriverTable.Drivers[0],
//  }),
// getDriverRaces: builder.query<DriverRacesResponse, { id: string; page: number }>({
//   query: ({ id, page }) => ({
//     url: `/${id}/results`,
//    method: "get",
//    params: { offset: (page - 1) * 30, limit: 30 },
//  }),
//}),
