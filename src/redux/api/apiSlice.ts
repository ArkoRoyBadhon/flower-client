/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://flower-server.vercel.app/api/v1",
    // baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
  }),
  // refetchOnMountOrArgChange: 30,
  tagTypes: ["user", "flower", "sale"],
  endpoints: () => ({}),
});
