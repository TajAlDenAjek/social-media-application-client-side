import React from 'react'
import { PostType } from '../../features/post/postApiSlice'
import Post from '../../components/Post/Post'
import { useGetPostsQuery } from '../../features/post/postApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../../features/auth/authSlice'
import './posts.css'


type PostsProps = {
  userId: number
}

const Posts: React.FC<PostsProps> = ({ userId }) => {
  // const id=useSelector(selectCurrentId)
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery(userId)

  let content
  if (isLoading) {
    content = <h1>Loading...</h1>
  } else if (isSuccess) {
    content = posts.map((post: PostType, index: number) => (
      <Post post={post} key={index} />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div className="posts-page-container">
      {content}
    </div>
  )
}

export default Posts