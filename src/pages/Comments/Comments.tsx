import React from 'react'
import { useGetCommentsQuery, CommentType } from '../../features/comment/commentApiSlice'
import Comment from '../../components/Comment/Comment'
type CommentsProps = {
    userId: number | string,
}


const Comments: React.FC<CommentsProps> = ({ userId }) => {
    const {
        data: comments,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCommentsQuery(userId)

    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {
        content = comments.map((comment: CommentType, index: number) => (
            <Comment comment={comment} key={index} isRenderingOutPost={true}/>
        ))
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <div className="comments-page-container">
            {content}
        </div>
    )
}

export default Comments