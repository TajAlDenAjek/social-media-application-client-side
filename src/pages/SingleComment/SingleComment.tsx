import React from 'react'
import Comment from '../../components/Comment/Comment'
import { Link } from 'react-router-dom'
import { useGetCommentQuery } from '../../features/comment/commentApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../../features/auth/authSlice'
import './singlecomment.css'
const SingleComment = () => {
    const curId = location.pathname.split('/')[2];
    const id=useSelector(selectCurrentId)
    const {
        data: comment,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCommentQuery(curId)
    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {
        let isSameUser: boolean = (id === comment.userId ? true : false)
        content = <Comment comment={comment} isSameUser={isSameUser} isRenderingOutPost={true} />

    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    const goBack = () => {
        <Link to={String(window.history.back())} />
    };
    return (
        <div className="comment-page-container">
            <button onClick={goBack}>
                Go Back
            </button>
            {content}
        </div>
    )
}

export default SingleComment