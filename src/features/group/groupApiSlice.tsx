import { apiSlice } from "../../app/api/apiSlice";

type GroupUserType={
    id:number,
    groupId:number,
    userId:number,
    state:'Owner'|'Admin'|'normal'|'pending'|'kicked',
    createdAt:string|Date,
    updatedAt:string|Date,
    GroupId:number,
    UserId:number
}
type GroupType={
    id:number,
    groupName:string,
    groupDescription:string,
    groupPicture:string|null
    createdAt:string,
    updatedAt:string,
    GroupUser?:GroupUserType
}
type SingleGroup={
    msg:string,
    group:GroupType,
    role:'Owner'|'Admin'|'normal'|'pending'|'kicked'
}


export const groupApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSingleGroup: builder.query({
            query: (id) => `/group/${id}`,
            providesTags: ['Groups']
        }),
        getGroups: builder.query({
            query:() => `/group/my`,
            providesTags: ['Groups']
        }),
        getGroupsInSearch: builder.mutation({
            query: text => ({
                url: `/home/search?text=${text}`,
                method: 'GET',
            }),
            invalidatesTags: ['Groups']
        }),
        getJoinRequests: builder.query({
            query:(id) => `/group/${id}/join`,
            providesTags: ['Groups']
        }),
        getGroupMembers: builder.query({
            query:(id) => `/group/${id}/members`,
            providesTags: ['Groups']
        }),


        createGroup: builder.mutation({
            query: data => {
                const bodyFormData = new FormData();
                // bodyFormData.append('image', data.image);
                // bodyFormData.append('data', data.data);
                return {
                    url: `/group`,
                    method: 'POST',
                    body: bodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: ['Groups']
        }),
        updateGroup: builder.mutation({
            query: data => {
                const bodyFormData = new FormData();
                // bodyFormData.append('image', data.image);
                // bodyFormData.append('data', data.data);
                return {
                    url: `/group/${data.id}`,
                    method: 'PATCH',
                    body: bodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: ['Groups']
        }),
        deleteGroup: builder.mutation({
            query: id => ({
                url: `/group/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Groups']
        }),
        handleRequestToGroup: builder.mutation({
            query: id => ({
                url: `/group/${id}/join`,
                method: 'POST',
            }),
            invalidatesTags: ['Groups']
        }),
        modifyRole: builder.mutation({
            query: data => ({
                url: `/group/${data.groupId}/modifyRole/${data.userId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Groups']
        }),


    })
})


export const {
    useGetSingleGroupQuery,
    useGetGroupsQuery,
    useGetGroupsInSearchMutation,
    useGetJoinRequestsQuery,
    useGetGroupMembersQuery,
    useCreateGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,
    useHandleRequestToGroupMutation,
    useModifyRoleMutation
} = groupApiSlice