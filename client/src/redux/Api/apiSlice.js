import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';   
import {signOutSuccess} from '../../redux/userSlice/user.slice.js'
const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
})

const baseQueryWithAuth = async (args, api, extraOptions) => {
    const rs = await rawBaseQuery(args, api, extraOptions);

    if(rs?.error?.status === 401) {
        // handle unauthorized errors
        api.dispatch(signOutSuccess());
    }
    return rs;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithAuth,
    tagTypes: ['User', 'Products', 'Orders '],
    endpoints: () => ({}),
})