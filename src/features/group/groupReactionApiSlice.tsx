import { apiSlice } from "../../app/api/apiSlice";




export const groupReactionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        createGroupReaction: builder.mutation({
            query: (data) => {
                return {
                    url: `/group/${data.groupId}/reaction/${data.postId}`,
                    method: 'POST',
                    body: {state:data.state},
                    formData: true,
                };
            },
            invalidatesTags: ['GroupPosts']
        }),
        updateGroupReaction: builder.mutation({
            query: data => {
                return {
                    url: `/group/${data.groupId}/reaction/${data.reactionId}`,
                    method: 'PATCH',
                    body: {state:data.state},
                    formData: true,
                };
            },
            invalidatesTags: ['GroupPosts']
        }),
        deleteGroupReaction: builder.mutation({
            query: data => ({
                url: `/group/${data.groupId}/reaction/${data.reactionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['GroupPosts']
        }),
    })
})


export const {
    useCreateGroupReactionMutation,
    useUpdateGroupReactionMutation,
    useDeleteGroupReactionMutation
} = groupReactionApiSlice