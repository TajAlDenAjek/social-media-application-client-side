import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEdit, faTrash, faComment } from '@fortawesome/free-solid-svg-icons';
import Comment from '../Comment/Comment';
import { CommentType, useCreateCommentMutation } from '../../features/comment/commentApiSlice';
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'
import { fetchImage } from '../SimpleImageFetcher';
import { PostType, useUpdatePostMutation, useDeletePostMutation } from '../../features/post/postApiSlice';
import { useNavigate, Link } from 'react-router-dom';

import './post.css'
type PostProps = {
  post: PostType,
  isSameUser?: boolean
} | any

type UpdatedPostData = {
  id: number,
  data: string | Object,
  image?: any
}

const Post: React.FC<PostProps> = ({ post, isSameUser }) => {

  const [profilePicture, setProfilePicture] = useState('')
  const [file, setFile] = useState(undefined);
  const [postImage, setPostImage] = useState('')
  const [updatePostMethod, { }] = useUpdatePostMutation()
  const [deletePostMethod, { }] = useDeletePostMutation()
  const [postText, setPostText] = useState(post.text)
  const navigate = useNavigate()
  const token = useSelector(selectCurrentToken)
  // error messages
  const [errMsg, setErrMsg] = useState<string | string[] | null>('')


  // comment
  const [commentText,setCommentText]=useState('')
  const [createComment,{}]=useCreateCommentMutation()

  const handleCreateComment=async()=>{
    if(commentText!==''){
      const res=await createComment({postId:post.id,text:commentText})
    }
  }
  // refrence to the input behined the image
  const fileInputRef = useRef<React.MutableRefObject<undefined> | any>(null);
  // upload image functionality 
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    const file = event.target.files[0];
    setFile(file)
    setPostImage(URL.createObjectURL(file))
  };
  // handle click and update the refrence 
  const uploadImage = () => {
    fileInputRef.current.click();
  };

  // update query request
  const handleUpdate = async () => {
    // alert confirmation 
    if (window.confirm('Are you sure you want to Update ?')) {
      setErrMsg([]);
      try {
        // set basic info and id 
        let data = { text: postText }
        const req: UpdatedPostData = { id: post.id, data }
        // set new image if exist
        if (file) {
          req.image = file
        }
        // stringify as required from backend
        req.data = JSON.stringify(req.data)
        // request 
        await updatePostMethod(req).unwrap()
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
        await deletePostMethod(post.id)
        navigate('/')
      } catch (error) { }
    }
  };
  // normal fetch request to a static image on the backend 
  useEffect(() => {
    if (post.User.picturePath)
      fetchImage(post.User.picturePath, setProfilePicture, token)
    else if (post.User.picturePath === null)
      fetchImage('default.png', setProfilePicture, token)
    if (post.picture)
      fetchImage(post.picture, setPostImage, token)
    else if (post.picture === null)
      fetchImage('default.png', setPostImage, token)
  }, [])

  let content = (
    <div className="post-card" >
      <div className="post-header">
        <img src={profilePicture} alt="Profile Picture" className="post-profile-picture" />
        <div>
          <Link to={`/userProfile/${post.userId}`}>
            <h3 className="post-author">{post.User.username}</h3>
          </Link>
          <p className="post-time">{post.createdAt}</p>
        </div>
        {
          isSameUser
            ?
            <div className="post-header-actions">
              <FontAwesomeIcon icon={faEdit} style={{ color: 'green', cursor: 'pointer' }} onClick={handleUpdate} />
              <FontAwesomeIcon icon={faTrash} style={{ color: 'red', cursor: 'pointer' }} onClick={handleDelete} />
            </div>
            :
            <></>
        }
      </div>
      <div className="post-items">
        {
          isSameUser && errMsg
            ? <div className="error-message">{errMsg}</div>
            : <></>
        }
        <Link to={`/post/${post.id}`}>
          {
            isSameUser ? <textarea className='singlePostDescInput' value={postText} onChange={(e) => setPostText(e.target.value)} />
              : <p className="post-content">{postText}</p>
          }

        </Link>
      </div>
      <div className="post-items">
        {
          isSameUser
            ?
            <>
              <img src={postImage} alt="Post Image" onClick={uploadImage} style={{ cursor: "pointer" }} className="post-image" />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </>
            :
            <img src={postImage} alt="Post Image" className="post-image" />
        }
      </div>
      <div className="post-counts">

        <span className="post-likes"><FontAwesomeIcon icon={faThumbsUp} />{post.likesCount}</span>

        <span className="post-dislikes"><FontAwesomeIcon icon={faThumbsDown} />{post.dislikesCount}</span>
      </div>
      <div className="post-items">
        {/* { */}
        {/* // post.Comments.lenght  ? */}
        <span className='post-comment-span'>
          <input type="text" className="post-comment-input" placeholder='Write a comment.' 
          value={commentText}
          onChange={e=>setCommentText(e.target.value)}
          />
          
          <FontAwesomeIcon icon={faComment} style={{cursor:'pointer'}} title="post comment" onClick={handleCreateComment}/>
        </span>
        <div className="post-comments">
          {post.Comments.map((comment: CommentType, index: number) => (
            <Comment comment={comment} key={index} />
          ))}
        </div>
        {/* } */}
      </div>
    </div>
  )
  return content;
}

export default Post