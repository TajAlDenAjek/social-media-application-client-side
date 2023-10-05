import { apiSlice } from "../../app/api/apiSlice";
import { CommentType } from "../comment/commentApiSlice";
import { ReactionType } from "../reaction/reactionApiSlice";
import { UserType } from "../user/userApiSlice";

export type PostType = {
    id: number,
    userId: number
    text: string,
    picture: string,
    createdAt: string,
    updatedAt: string,
    state: "public" | "private",
    commentsCount: number,
    likesCount: number,
    dislikesCount: number,
    User: UserType,
    Comments: CommentType[],
    Reactions: ReactionType[],
}



export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: (id) => `/post/all/${id}`,
            providesTags: ['Posts']
        }),
        getPostsAsNews: builder.query({
            query:() => `/home/news`,
            providesTags: ['Posts']
        }),
        getPostsInSearch: builder.mutation({
            query: text => ({
                url: `/home/search?text=${text}`,
                method: 'GET',
            }),
            invalidatesTags: ['Posts']
        }),
        getPost: builder.query({
            query: postId => `/post/${postId}`,
            providesTags: ['Posts']
        }),
        createPost: builder.mutation({
            query: data => {
                const bodyFormData = new FormData();
                bodyFormData.append('image', data.image);
                bodyFormData.append('data', data.data);
                return {
                    url: `/post/create`,
                    method: 'POST',
                    body: bodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: ['Posts']
        }),
        updatePost: builder.mutation({
            query: data => {
                const bodyFormData = new FormData();
                bodyFormData.append('image', data.image);
                bodyFormData.append('data', data.data);
                return {
                    url: `/post/edit/${data.id}`,
                    method: 'PATCH',
                    body: bodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: ['Posts']
        }),
        deletePost: builder.mutation({
            query: id => ({
                url: `/post/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts']
        }),
    })
})


export const {
    useGetPostsQuery,
    useGetPostQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
    useGetPostsAsNewsQuery,
    useCreatePostMutation,
    useGetPostsInSearchMutation
} = postApiSlice