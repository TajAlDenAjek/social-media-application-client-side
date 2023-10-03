import React from 'react'
import { PostType } from '../../features/post/postApiSlice'
import Post from '../../components/Post/Post'
import { useGetPostQuery } from '../../features/post/postApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../../features/auth/authSlice'
import './singlepost.css'
import { Link } from 'react-router-dom'
const SinglePost = () => {
    const curId = location.pathname.split('/')[2];
    const id=useSelector(selectCurrentId)
    const {
        data: post,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostQuery(curId)
    let isSameUser:boolean=(id===post.userId?true:false)
    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {
        content = <Post post={post} isSameUser={isSameUser} />

    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    const goBack = () => {
        <Link to={String(window.history.back())} />
    };
    return (
        <div className="post-page-container">
            <button onClick={goBack}>
                Go Back
            </button>
            {content}
        </div>
    )
}

export default SinglePost