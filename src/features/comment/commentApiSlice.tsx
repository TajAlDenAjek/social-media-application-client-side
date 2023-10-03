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
        // getPosts: builder.query({
            // query: (id) => `/post/all/${id}` 
        // })
    })
})


export const {

} = commentApiSlice