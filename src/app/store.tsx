import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

// import other reducers
import authReducer from '../features/auth/authSlice'

// store (state,(reducers(actions to dispatch)))

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
    , devTools: true
})

export type RootState = ReturnType<typeof store.getState>
