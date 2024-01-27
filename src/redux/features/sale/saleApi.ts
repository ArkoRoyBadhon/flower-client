import { api } from "../../api/apiSlice";

const saleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSale: builder.query({
      query: ({ ...option }) => ({
        url: `/sale/get-all`,
        params: {
          sortBy: option?.sortBy,
          sortOrder: option?.sortOrder,
          limit: 8,
          // ...(option?.pageNum && { page: option.pageNum }),
          // ...(option?.pageNum && { limit: 2 }),
          ...(option?.saleHistory && { saleHistory: option.saleHistory }),
        },
      }),
      providesTags: ["sale"],
    }),
    createSale: builder.mutation({
      query: (tutorData) => ({
        url: `/sale/create`,
        method: "POST",
        body: tutorData,
      }),
      invalidatesTags: ["sale"],
    }),
  }),
});

export const { useGetAllSaleQuery, useCreateSaleMutation } = saleApi;
