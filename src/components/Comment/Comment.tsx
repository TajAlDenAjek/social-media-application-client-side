import React, { useState, useEffect } from 'react'
import { CommentType } from '../../features/comment/commentApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'
import { fetchImage } from '../SimpleImageFetcher'
import { Link, useNavigate } from 'react-router-dom'
import './comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit, faX } from '@fortawesome/free-solid-svg-icons';
import { useDeleteCommentMutation, useUpdateCommentMutation } from '../../features/comment/commentApiSlice'

type CommentProps = {
    comment: CommentType,
    isRenderingOutPost?: boolean,
    isSameUser?: boolean
} | any


type updateCommentType = {
    commentId: number,
    text: string
}

const Comment: React.FC<CommentProps> = ({ comment, isRenderingOutPost, isSameUser }) => {
    const [img, setImg] = useState('');
    const token = useSelector(selectCurrentToken)

    const [commentText, setCommentText] = useState(comment.text)
    // error messages
    const [errMsg, setErrMsg] = useState<string | string[] | null>('')

    useEffect(() => {
        if (comment.User.picturePath)
            fetchImage(comment.User.picturePath, setImg, token)
        else if (comment.User.picturePath === null)
            fetchImage('default.png', setImg, token)
    }, [])

    const [deleteComment, { }] = useDeleteCommentMutation()
    const [updateComment, { }] = useUpdateCommentMutation()
    const navigate = useNavigate()
    // update query request
    const handleUpdate = async () => {
        // alert confirmation 
        if (window.confirm('Are you sure you want to Update ?')) {
            setErrMsg([]);
            try {
                // set basic text and id 
                const req: updateCommentType = { commentId: comment.id, text: commentText }
                // request 
                await updateComment(req).unwrap()
                // refresh when success
                // window.location.reload();
            } catch (error: any) {
                // handleing error message from backend api
                //init 
                setErrMsg([]);
                let oneError: Boolean = false;
                const errors = error.data;
                let errorText: string[] = [];

                // loop over errors
                for (const key in errors) {
                    if (Object.hasOwnProperty.call(errors, key)) {
                        errorText.push(errors[key])
                        oneError = true
                    }
                }
                // setting new error message
                setErrMsg(errorText)
                // default message 
                if (!oneError)
                    setErrMsg('Something Went Wrong !!')
            }
        }
    };
    // delete query request
    const handleDelete = async () => {
        // as the update use alert confirmation
        if (window.confirm('Are you sure you want to Delete ?')) {
            try {
                await deleteComment(comment.id)
                navigate(`/post/${comment.postId}`)
            } catch (error) { }
        }
    };
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
                    <Link to={`/comment/${comment.id}`}>
                        {
                            isSameUser ? <textarea className='singlePostDescInput' value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                                : <p className="post-comment-content">{commentText}</p>
                        }

                    </Link>
                    {
                        isSameUser && errMsg
                            ? <div className="error-message">{errMsg}</div>
                            : <></>
                    }
                </div>
                <div className="Comment-actions">
                    {
                        isRenderingOutPost &&
                        <>
                            <Link to={`/post/${comment.postId}`} className='post-comment-ShowPostLink'>
                                show post
                            </Link>
                        </>
                    }
                    {

                        isSameUser &&
                        <>
                            <div className="commentUpdateDeleteContainer">

                                <FontAwesomeIcon icon={faFileEdit} style={{ color: 'green', cursor: 'pointer' }} onClick={handleUpdate} />
                                <FontAwesomeIcon icon={faX} style={{ color: 'red', cursor: 'pointer' }} onClick={handleDelete} />
                            </div>
                        </>
                    }
                </div>

            </div>
            <br />
            <hr />
            <br />
        </>
    )
}

export default Comment