import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'
let SERVER_SIDE = import.meta.env.VITE_REACT_API_KEY + '/api'


type RefreshResponse = {
    data: any,
    user: {
        id?: number,
        username?: string,
    } | any
} | any

// configure for cookies and tokens
const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_SIDE,
    credentials: 'include',
    
    prepareHeaders: (headers, { getState}: any) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }  
})

// custom query function to (access-refresh) logic
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    // try first request
    let result = await baseQuery(args, api, extraOptions)
    // your token maybe expired 
    if (result?.error?.status === 401) {
        // sending refresh request
        const refreshResult: RefreshResponse = await baseQuery('/auth/refresh', api, extraOptions)
        // is my token still alive ? 
        if (refreshResult?.data) {
            // if yes then save it 
            const { id, username } = refreshResult.data.user
            //store new token
            api.dispatch(setCredentials({ ...refreshResult.data, id, username }))
            // retry the original request with the new alive token
            result = await baseQuery(args, api, extraOptions)
        }
        else {
            // if no then let me out I don't belong to this website anymore
            api.dispatch(logOut())
        }
    }
    return result
}

// Api Slice 
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['auth','Posts','Comments','Reactions','Users','Groups','Messages','Relationships','Chat','GroupPosts','GroupComments','GroupReactions'],
    endpoints: () => ({}),
})


