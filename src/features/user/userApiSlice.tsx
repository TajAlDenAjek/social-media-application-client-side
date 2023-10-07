import { apiSlice } from "../../app/api/apiSlice";

export type UserProfile = {
    username: string,
    password?: string,
    email: string,
    createdAt: string,
    firstName: string | undefined,
    lastName: string | undefined,
    gender: "male" | "female" | undefined
    birthday: string | undefined,
    country: string | undefined,
    picturePath: string | undefined,
    state: "friends" | "not friends" | "pending" | "blocked" | undefined
}
export type UserType={
    id?:number,
    username:string,
    picturePath:string|null
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.mutation({
            query: data => ({
                url: `/user/profile/${data.id}`,
                method: 'GET',
            })
        }),
        updateProfile: builder.mutation({
            query: data => {
                const bodyFormData = new FormData();
                bodyFormData.append('image', data.image);
                bodyFormData.append('data',data.data);
                return {
                    url: `/user/profile/${data.id}`,
                    method: 'PATCH',
                    body: bodyFormData,
                    formData: true,
                };
            }
        }),
        deleteProfile: builder.mutation({
            query: id => ({
                url: `/user/profile/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users','Posts','Comments','Reactions']
        }),
    })
})


export const {
    useGetProfileMutation,
    useUpdateProfileMutation,
    useDeleteProfileMutation
} = userApiSlice;
