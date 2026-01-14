import { BASE_URL } from '@/constants/constants';
import { RootState } from './store';
import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { toast } from 'sonner';

interface ErrorResponse {
    message: string;
    status: boolean;
}

  // Define success response type with a dynamic DT
export interface SuccessResponse<DataType = any> {
    data: DataType;
    message: string;
    status: boolean;
}

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL ,
})


const baseQueryWithInterceptor: typeof baseQuery = async (
    args,
    api,
    extraOptions
) => {
    const result = await baseQuery(args, api, extraOptions);
    const method = typeof args === "string" ? "GET" : args.method || "GET";
    // console.log(method, result);
    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithInterceptor,
    tagTypes: ["Products" , "Categories", "Contact"],
    endpoints: () => ({}),
});