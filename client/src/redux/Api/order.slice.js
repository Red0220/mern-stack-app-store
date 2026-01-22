import { apiSlice } from "./apiSlice.js";
import { Orders_url } from  "../baseQueries.js"


export const orderApiSlcie = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: `${Orders_url}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags:["Orders", "MyOrders"]
        }),
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `${Orders_url}/${orderId}`,
                method: 'GET',

            }),
            invalidatesTags: (result, error, orderId) => [{ type: 'Orders', id: orderId }],
        }),
        getUserOrders: builder.query({
            query: () => `${Orders_url}/myorders`,
            invalidatesTags:["MyOrders"]
        }),
        getAllOrders: builder.query({
            query: () => `${Orders_url}/orders`,
            providesTags: ["Orders"]
        })
    })
})

export const {
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetUserOrdersQuery,
    useGetAllOrdersQuery
} = orderApiSlcie;