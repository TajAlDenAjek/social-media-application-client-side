import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

// import other reducers
import authReducer from '../features/auth/authSlice'
import chatReducer from '../features/chat/chatSlice'
// store (state,(reducers(actions to dispatch)))

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        chat:chatReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false,}).concat(apiSlice.middleware)
    , devTools: true
})

export type RootState = ReturnType<typeof store.getState>
