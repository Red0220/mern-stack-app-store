import { apiSlice} from './apiSlice.js';
import { Users_url } from '../baseQueries.js';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${Users_url}/sign-in`,
                method: 'POST',
                body: data,
            })
        }),
        signUp: builder.mutation({
            query: (data) => ({
                url: `${Users_url}/sign-up`,
                method: 'POST',
                body: data,
            })
        }),
        logout: builder.mutation({
            query: ()=>({
                url: `${Users_url}/log-out`,
                method: 'POST',
            })
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${Users_url}/delete/${userId}`,
                method: 'DELETE',
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${Users_url}/update/${data.userId}`,
                method: 'PATCH',
                body: data,
            })
        }),
        getUsers: builder.query({
            query: ()=> ({
                url: `${Users_url}/users`,
                method: 'GET',
            }),
       
        })
    })
})

export const {
    useLoginMutation,
    useSignUpMutation,
    useLogoutMutation,
    useDeleteUserMutation,
    useUpdateProfileMutation,
    useGetUsersQuery
} = authApiSlice