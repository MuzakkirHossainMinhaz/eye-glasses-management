import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSales: builder.mutation({
            query: (newSales) => ({
                url: "/sales/create-sale",
                method: "POST",
                body: newSales,
            }),
            invalidatesTags: ["EyeGlasses"],
        }),
        getAllSales: builder.query({
            query: () => {
                return { url: "/sales", method: "GET" };
            },
        }),
    }),
});

export const { useCreateSalesMutation, useGetAllSalesQuery } = salesApi;
