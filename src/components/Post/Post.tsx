import React, { useState, useEffect } from 'react'
import { PostType } from '../../features/post/postApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Comment from '../Comment/Comment';
import { Link } from 'react-router-dom';
import { CommentType } from '../../features/comment/commentApiSlice';
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'
import { fetchImage } from '../SimpleImageFetcher';
import './post.css'
type PostProps = {
  post: PostType,
  isSameUser?: boolean
} | any


const Post: React.FC<PostProps> = ({ post, isSameUser }) => {

  const [profilePicture, setProfilePicture] = useState('')
  const [postImage, setPostImage] = useState('')
  const [postText,setPostText]=useState(post.text)
  const token = useSelector(selectCurrentToken)

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
  return (

    <div className="post-card" >
      {isSameUser ? <p>you are auhtorized to edit this</p> : <></>}
      <div className="post-header">
        <img
          src={profilePicture}
          alt="Profile Picture"
          className="post-profile-picture"
        />
        <div>
          <h3 className="post-author">{post.User.username}</h3>
          <p className="post-time">{post.createdAt}</p>
        </div>
      </div>
      <div className="post-items">
        <Link to={`/post/${post.id}`}>
          {
            isSameUser?<textarea className='singlePostDescInput' value={postText} onChange={(e)=>setPostText(e.target.value)}/>
            :<p className="post-content">{postText}</p>
          }
          
        </Link>
      </div>
      <div className="post-items">
        <img src={postImage} alt="Post Image" className="post-image" />
      </div>
      <div className="post-counts">

        <span className="post-likes"><FontAwesomeIcon icon={faThumbsUp} />{post.likesCount}</span>

        <span className="post-dislikes"><FontAwesomeIcon icon={faThumbsDown} />{post.dislikesCount}</span>
      </div>
      <div className="post-items">
        {
          post.Comments.lenght>=1?
            <div className="post-comments">
              {post.Comments.map((comment: CommentType, index: number) => (
                <Comment comment={comment} key={index} />
              ))}
            </div> : <></>
        }
      </div>
    </div>
  );
}

export default Post