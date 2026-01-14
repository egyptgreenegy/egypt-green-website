import axios from 'axios';
export const getProducts = async (params:any) => {
    try {
        const response = await axios.get(`https://egypt-green-api.vercel.app/api/product?page=${params.page}&limit=${params.limit}`);
        return response.data.data;
    }
    catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}