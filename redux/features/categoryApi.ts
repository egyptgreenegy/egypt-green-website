import { baseApi, SuccessResponse } from "../app/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<SuccessResponse<{categories:any[]}> , void>({
            query: () => ({
                url: "category",
            }),
            providesTags: ["Categories"],
        }),
        getCategoryById: builder.query({
            query: (id) => `category/${id}`,
            providesTags: ["Categories"],
        }),
    }),
})
export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;