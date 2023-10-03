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
            query: (id) => `/post/all/${id}`
        }),
        getPost: builder.query({
            query: postId => `/post/${postId}`
        })
    })
})


export const {
    useGetPostsQuery,
    useGetPostQuery
} = postApiSlice