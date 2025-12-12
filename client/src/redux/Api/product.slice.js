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
            invalidatesTags: ['Product'],
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${Products_url}/${productId}`,
                method: 'GET',
            }),
        
        }),
        getProducts: builder.query({
            query: () => ({
                url: `${Products_url}/`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${Products_url}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    })
})

export const {
    useCreateProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
    useDeleteProductMutation,
} = productApiSlice;
