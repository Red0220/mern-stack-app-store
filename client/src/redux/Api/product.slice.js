import { apiSlice } from './apiSlice.js'
import { Products_url }  from '../baseQueries.js'


const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${Products_url}/`,
                method: 'POST', 
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${Products_url}/${productId}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
        getProducts: builder.query({
            query: () => ({
                url: `${Products_url}/`,
                method: 'GET',
            }),
            providesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${Products_url}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    })
})

export const {
    useCreateProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
    useDeleteProductMutation,
} = productApiSlice;
