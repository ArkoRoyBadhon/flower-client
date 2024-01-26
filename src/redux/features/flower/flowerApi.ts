import { api } from "../../api/apiSlice";

const flowerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createFlower: builder.mutation({
      query: (flowerData) => ({
        url: `/flower/create`,
        method: "POST",
        body: flowerData,
      }),
      invalidatesTags: ["flower"],
    }),
    getAllFlower: builder.query({
      query: () => ({
        url: `/flower/get-flowers`,
        providesTags: ["flower"],
      }),
    }),
  }),
});

export const { useCreateFlowerMutation,useGetAllFlowerQuery } = flowerApi;
