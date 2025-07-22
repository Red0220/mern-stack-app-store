import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import userReducer from './userSlice/user.slice.js'
import { apiSlice} from './Api/apiSlice.js'
import { setupListeners } from "@reduxjs/toolkit/query";


const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
 
})

const persistConfing = {
    key : 'root',
    storage,
    version: 1
}

const persistReducers = persistReducer(persistConfing, rootReducer)

export const store = configureStore({
    reducer: persistReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(apiSlice.middleware),
})
setupListeners(store.dispatch)
export const persistor = persistStore(store)