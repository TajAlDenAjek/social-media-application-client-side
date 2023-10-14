import { apiSlice } from "../../app/api/apiSlice";


export const groupPostApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGroupPosts: builder.query({
            query: (id) => `/group/${id}/post`,
            providesTags: ['Groups','auth','GroupPosts']
        }),
        getGroupPost: builder.query({
            query:(data) => `/group/${data.groupId}/post/${data.postId}`,
            providesTags: ['Groups','auth','GroupPosts']
        }),

        createGroupPost: builder.mutation({
            query: data => {
                const bodyFormData = new FormData();
                // bodyFormData.append('image', data.image);
                // bodyFormData.append('data', data.data);
                return {
                    url: `/group/${data.groupId}/post`,
                    method: 'POST',
                    body: bodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: ['GroupPosts']
        }),
        updateGroupPost: builder.mutation({
            query: data => {
                const bodyFormData = new FormData();
                // bodyFormData.append('image', data.image);
                // bodyFormData.append('data', data.data);
                return {
                    url: `/group/${data.groupId}/post/${data.postId}`,
                    method: 'PATCH',
                    body: bodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: ['GroupPosts']
        }),
        deleteGroupPost: builder.mutation({
            query: data => ({
                url: `/group/${data.groupId}/post/${data.postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['GroupPosts']
        }),
    })
})


export const {
    useGetGroupPostsQuery,
    useGetGroupPostQuery,
    useCreateGroupPostMutation,
    useUpdateGroupPostMutation,
    useDeleteGroupPostMutation
} = groupPostApiSlice