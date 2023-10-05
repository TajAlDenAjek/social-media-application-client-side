import React, { useState, useEffect } from 'react'
import { CommentType } from '../../features/comment/commentApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'
import { fetchImage } from '../SimpleImageFetcher'
import { Link } from 'react-router-dom'
import './comment.css'

type CommentProps = {
    comment: CommentType,
    isRenderingOutPost?: boolean
} | any

const Comment: React.FC<CommentProps> = ({ comment, isRenderingOutPost }) => {
    const [img, setImg] = useState('');
    const token = useSelector(selectCurrentToken)
    useEffect(() => {
        if (comment.User.picturePath)
            fetchImage(comment.User.picturePath, setImg, token)
        else if (comment.User.picturePath === null)
            fetchImage('default.png', setImg, token)
    }, [])
    return (
        <>
            <div className="post-comment">
                <img
                    src={img}
                    alt="Commenter Profile Picture"
                    className="post-comment-profile-picture"
                />
                <div className="post-comment-info-container">
                    <Link to={`/userProfile/${comment.userId}`}>
                        <h4 className="post-comment-author">{comment.User.username}</h4>
                    </Link>
                    <p className="post-comment-time">{comment.createdAt}</p>
                    <p className="post-comment-content">{comment.text}</p>
                </div>
                {
                    isRenderingOutPost && <Link to={`/post/${comment.postId}`} className='post-comment-ShowPostLink'>
                        show post
                    </Link>
                }

            </div>
            <br />
            <hr />
            <br />
        </>
    )
}

export default Comment