import { apiSlice } from "../../app/api/apiSlice";




export const groupCommentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGroupComment: builder.query({
            query: (data) => `/group/${data.groupId}/comment/${data.commentId}`,
            providesTags: ['GroupComments']
        }),

        createGroupComment: builder.mutation({
            query: (data) => {
                return {
                    url: `/group/${data.groupId}/comment/${data.postId}`,
                    method: 'POST',
                    body: {text:data.text},
                    formData: true,
                };
            },
            invalidatesTags: ['GroupComments']
        }),
        updateGroupComment: builder.mutation({
            query: data => {
                return {
                    url: `/group/${data.groupId}/comment/${data.commentId}`,
                    method: 'PATCH',
                    body: {text:data.text},
                    formData: true,
                };
            },
            invalidatesTags: ['GroupPosts','GroupComments']
        }),
        deleteGroupComment: builder.mutation({
            query: data => ({
                url: `/group/${data.groupId}/comment/${data.commentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['GroupPosts','GroupComments']
        }),
    })
})


export const {
    useGetGroupCommentQuery,
    useCreateGroupCommentMutation,
    useUpdateGroupCommentMutation,
    useDeleteGroupCommentMutation
} = groupCommentApiSlice