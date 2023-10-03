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
        // getPosts: builder.query({
            // query: (id) => `/post/all/${id}` 
        // })
    })
})


export const {

} = reactionApiSlice