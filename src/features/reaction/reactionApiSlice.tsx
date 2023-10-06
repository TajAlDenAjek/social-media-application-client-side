import { apiSlice } from "../../app/api/apiSlice";
import { UserType } from "../user/userApiSlice";

export type ReactionType={
    id:number,
    userId:number,
    postId:number,
    state:"like"|"dislike",
    createdAt:string,
    updatedAt:string,
    User:UserType
}

export const reactionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReactions: builder.query({
            query: (id) => `/reaction/all/${id}`, // user id 
            providesTags: ['Reactions']
        }),
        getReaction: builder.query({
            query: reactionId=> `/reaction/${reactionId}`,
            providesTags: ['Reactions']
        }),
        createReaction: builder.mutation({
            query: (data) => {
                return {
                    url: `/reaction/add/${data.postId}`,
                    method: 'POST',
                    body: {state:data.state},
                    formData: true,
                };
            },
            invalidatesTags: ['Posts','Reactions']
        }),
        updateReaction: builder.mutation({
            query: data => {
                return {
                    url: `/reaction/edit/${data.reactionId}`,
                    method: 'PATCH',
                    body: {state:data.state},
                    formData: true,
                };
            },
            invalidatesTags: ['Posts','Reactions']
        }),
        deleteReaction: builder.mutation({
            query: id => ({
                url: `/reaction/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts','Reactions']
        }),
    })
})


export const {
    useGetReactionsQuery,
    useGetReactionQuery,
    useCreateReactionMutation,
    useUpdateReactionMutation,
    useDeleteReactionMutation
} = reactionApiSlice