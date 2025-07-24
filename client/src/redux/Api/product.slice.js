import { apiSlice } from './apiSlice.js'
import { Products_url }  from '../baseQueries.js'


const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${Products_url}/`,
                method: 'POST', 
                body: data,
            })
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${Products_url}/${productId}`,
                method: 'GET',
            })
        }),
        getProducts: builder.query({
            query: () => ({
                url: `${Products_url}/`,
                method: 'GET',
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${Products_url}/${productId}`,
                method: 'DELETE',
            })
        }),
    })
})