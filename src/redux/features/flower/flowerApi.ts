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
      query: ({...option}) => ({
        url: `/flower/get-flowers`,
        params: {
          sortBy: option?.sortBy,
          sortOrder: option?.sortOrder,
          searchTerm: option?.searchVal,
          limit: 8,
          ...(option?.selectedColor && { color: option.selectedColor.value }),
          ...(option?.selectedFragrance && { fragrance: option.selectedFragrance.value }),
          ...(option?.selectedOccation && { occation: option.selectedOccation.value }),
          ...(option?.selectedSize && { size: option.selectedSize.value }),
          ...(option?.selectedType && { type: option.selectedType.value }),
          ...(option?.selectedBloom && { bloom_date: option.selectedBloom.value }),
        },
        providesTags: ["flower"],
      }),
    }),
  }),
});

export const { useCreateFlowerMutation,useGetAllFlowerQuery } = flowerApi;
