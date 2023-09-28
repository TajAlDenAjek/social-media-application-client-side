import { apiSlice } from "../../app/api/apiSlice";


export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getProfile:builder.mutation({
            query: data => ({
                url: `/user/profile/${data.id}`,
                method: 'GET',
            })
        })
    })
})


export const {
    useGetProfileMutation
}=userApiSlice;
