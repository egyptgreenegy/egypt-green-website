import { baseApi, SuccessResponse } from "../app/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<SuccessResponse<{products:any[] , pagination:any}> , {params?:any}>({
            query: ({ params } = {}) => {
                const query = new URLSearchParams()
                if (params?.page) query.append("page", params.page)
                if (params?.limit) query.append("limit", params.limit)
                if (params?.category) query.append("category", params.category)
                return {
                    url: `product?${query.toString()}`
                }
            },
            providesTags: ["Products"],
        }),
        getProductById: builder.query({
            query: (id) => `product/${id}`,
            providesTags: ["Products"],
        }),
    }),
})
export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;