import { apiSlice } from "../../app/api/apiSlice";
import { UserType } from "../user/userApiSlice";

export type CommentType={
    id:number,
    userId:number,
    postId:number,
    text:string,
    createdAt:string,
    updatedAt:string,
    User:UserType
}

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getComments: builder.query({
            query: (id) => `/comment/all/${id}`,
            providesTags: ['Comments']
        }),
        getComment: builder.query({
            query: commentId=> `/comment/${commentId}`,
            providesTags: ['Comments']
        }),
        createComment: builder.mutation({
            query: (data) => {
                return {
                    url: `/comment/add/${data.postId}`,
                    method: 'POST',
                    body: {text:data.text},
                    formData: true,
                };
            },
            invalidatesTags: ['Posts','Comments']
        }),
        updateComment: builder.mutation({
            query: data => {
                return {
                    url: `/comment/edit/${data.commentId}`,
                    method: 'PATCH',
                    body: {text:data.text},
                    formData: true,
                };
            },
            invalidatesTags: ['Posts','Comments']
        }),
        deleteComment: builder.mutation({
            query: id => ({
                url: `/comment/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts','Comments']
        }),
    })
})


export const {
    useGetCommentQuery,
    useGetCommentsQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation
} = commentApiSlice