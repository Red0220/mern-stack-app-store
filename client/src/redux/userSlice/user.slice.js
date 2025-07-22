import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser : null ,
    error : null,
    loading : false 
}

const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers: {
        signinStart : state => {
            state.loading = true ,
            state.error = null
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false ,
            state.error = null
        },

        signinFailure: (state, action)=> {
            state.error = action.payload ,
            state.loading = false,
            state.currentUser = null
        },
        signOutSuccess: state => {
            state.currentUser = null ,
            state.loading = false ,
            state.error = null
        },
        //update user 
        updateStart : state => {
            state.loading = true ,
            state.error = null
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false ,
            state.error = null
        },
        updateFailed: (state, action)=> {
            state.error = action.payload,
            state.loading = false
        },
        //Delete user
        deleteUserSuccess: state => {
            state.currentUser = null,
            state.loading = false ,
            state.error = null 
        }

    }
})

export const {
    signinStart,
    signinSuccess,
    signinFailure,
    signOutSuccess,
    updateStart,
    updateSuccess,
    updateFailed, 
    deleteUserSuccess
} = userSlice.actions;

export default userSlice.reducer; 
