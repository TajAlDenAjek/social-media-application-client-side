import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import { useGetPostsAsNewsQuery, useCreatePostMutation, useGetPostsInSearchMutation } from '../../features/post/postApiSlice'
import Post from '../../components/Post/Post'
import { PostType } from '../../features/post/postApiSlice'

type createdPost = {
  data: string | Object,
  image?: any
}

type searchReqType = {
  data: any | {
    posts: PostType[] | any,
    groups: any,
    users: any,
    msg: String
  }
} | any
const Home = () => {
  // error messages
  const [errMsg, setErrMsg] = useState<string | string[] | null>('')
  const [showPostForm, setShowPostForm] = useState(false);
  const [file, setFile] = useState(undefined);
  const [postText, setPostText] = useState('')
  const [searchText, setSearchText] = useState('')
  const [createPost, { isLoading: isPosting }] = useCreatePostMutation()
  const [startSearch, setStartSearch] = useState(false)
  const [searchContent, setSearchContent] = useState<any>(null)
  const [searchResult, setSearchResult] = useState<any>(null)
  const handleCreatePost = () => {
    setShowPostForm(true);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    const file = event.target.files[0];
    setFile(file)
  };

  const { data: posts, isLoading, isSuccess, isError, error } = useGetPostsAsNewsQuery({})

  let content
  if (isLoading) {
    content = <h1>Loading...</h1>
  } else if (isSuccess) {
    content = posts.posts.map((post: PostType, index: number) => (
      <Post post={post} key={index} />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  const [searchQuery, { isLoading: isSearching, isSuccess: isSuccessSearch }] = useGetPostsInSearchMutation()
  // search query request
  useEffect(() => {
    if (searchText !== '')
      handleSearch()
    else
      setSearchContent('nothing')
  }, [searchText])
  const handleSearch = async () => {
    if (searchText !== '') {
      const queryReq: searchReqType = await searchQuery(searchText)
      const posts: PostType[] = queryReq.data.posts

      setSearchContent(posts.map((post: PostType, index: number) => (
        <Post post={post} key={index} />
      )))
      setSearchResult(<h3>{posts.length} Search Results Found !! </h3>)

    }
  }

  // create query request
  const handleCreate = async (e: any) => {
    setErrMsg([]);
    try {
      // set basic info and id 
      let data = { text: postText }
      const req: createdPost = { data }
      // set new image if exist
      if (file) {
        req.image = file
      }
      // stringify as required from backend
      req.data = JSON.stringify(req.data)
      // request 
      await createPost(req).unwrap()
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
  };
  return (
    <div className="home-page-container">
      <div className="home-actions">
        <div className="home-search">
          <input type="text" placeholder="Search" value={searchText} onChange={e => setSearchText(e.target.value)} />
          {/* <button onClick={handleSearch}>{isSearching ? "Searching..." : 'Search'}</button> */}
        </div>
        <div className="home-create-post">
          <button onClick={handleCreatePost}>Create Post</button>
        </div>

        {showPostForm && (
          <div className="home-post-form">
            <form>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <textarea placeholder="Enter your post" onChange={e => setPostText(e.target.value)} value={postText} />
              {errMsg && <div className="error-message">{errMsg}</div>}
              <button type="submit" onClick={handleCreate}>{isPosting ? 'Posting...' : 'Post'}</button>
            </form>
          </div>
        )}
      </div>

      {
        searchText === ''
          ? <>
              <h1>Recent Posts </h1>
              {content}
            </>
          : isSearching
            ? <h1>Searching ...</h1>
            : <>
                <br />
                {searchResult}
                <br />
                {searchContent}
              </>
      }
    </div>
  )
}

export default Home