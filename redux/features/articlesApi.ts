import { baseApi } from "../app/baseApi";

const articlesApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllArticles:builder.query<any , void>({
            query:()=>'/article'
        }),
        getArticle:builder.query<any,string>({
            query:(id)=>`article/${id}`
        })
    })
})
export const {useGetAllArticlesQuery , useGetArticleQuery} = articlesApi