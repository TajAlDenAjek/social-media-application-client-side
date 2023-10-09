import { apiSlice } from "../../app/api/apiSlice";


export const relationshipsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        usersSearch: builder.mutation({
            query: text => ({
                url: `/home/search?text=${text}`,
                method: 'GET',
            }),
            invalidatesTags: ['Users', 'Relationships']
        }),
        getFriends: builder.query({
            query: () => `/relationship/myFriends`,
            providesTags: ['Relationships', 'Users','auth']
        }),
        getSentRequests: builder.query({
            query: () => `/relationship/mySentRequests`,
            providesTags: ['Relationships', 'Users','auth']
        }),
        getReceivedRequests: builder.query({
            query: () => `/relationship/myReceivedRequests`,
            providesTags: ['Relationships', 'Users','auth']
        }),
        getBlockedUsers: builder.query({
            query: () => `/relationship/myBlockedList`,
            providesTags: ['Relationships', 'Users','auth']
        }),
        getWhoBlockedYouUsers: builder.query({
            query: () => '/relationship/whoBlockedMeList',
            providesTags: ['Relationships', 'Users','auth']
        }),
        sendFriendRequest: builder.mutation({
            query: id => ({
                url: `/relationship/sendFriendRequest/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Relationships', 'Users']
        }),
        deleteFriendRequest: builder.mutation({
            query: id => ({
                url: `/relationship/request/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Relationships', 'Users']
        }),
        removeFriend: builder.mutation({
            query: id => ({
                url: `/relationship/removeFriend/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Relationships', 'Users']
        }),

        acceptFriendRequest: builder.mutation({
            query: id => ({
                url: `/relationship/response/accept/
                ${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Relationships', 'Users']
        }),
        rejectFriendRequest: builder.mutation({
            query: id => ({
                url: `/relationship/response/reject/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Relationships', 'Users']
        }),

        blockAFriend: builder.mutation({
            query: id => ({
                url: `/relationship/blockAFriend/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Relationships', 'Users']
        }),
        unBlockaUser: builder.mutation({
            query: id => ({
                url: `/relationship/unblockAUser/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Relationships', 'Users']
        }),
    })
})

export const {
    useUsersSearchMutation,
    useGetFriendsQuery,
    useGetSentRequestsQuery,
    useGetReceivedRequestsQuery,
    useGetBlockedUsersQuery,
    useGetWhoBlockedYouUsersQuery,
    useSendFriendRequestMutation,
    useDeleteFriendRequestMutation,
    useRemoveFriendMutation,
    useAcceptFriendRequestMutation,
    useRejectFriendRequestMutation,
    useBlockAFriendMutation,
    useUnBlockaUserMutation
} = relationshipsApiSlice