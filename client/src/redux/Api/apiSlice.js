import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';   

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Products', 'Orders '],
    endpoints: () => ({}),
})