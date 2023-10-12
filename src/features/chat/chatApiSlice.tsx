import { apiSlice } from "../../app/api/apiSlice";


export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessages: builder.query({
            query: (id) => `/chat/messages/${id}`, // user id 
            providesTags: ['Chat']
        }),
    })
})


export const {
    useGetMessagesQuery
} = chatApiSlice

