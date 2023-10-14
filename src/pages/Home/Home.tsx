import React, { useEffect, useState } from 'react'
import {
  PostType,
  useGetPostsAsNewsQuery,
  useCreatePostMutation,
  useGetPostsInSearchMutation
} from '../../features/post/postApiSlice'
import Post from '../../components/Post/Post'
import './home.css'

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

  // show post form
  const [showPostForm, setShowPostForm] = useState(false);
  // post creation info
  const [file, setFile] = useState(undefined);
  const [postText, setPostText] = useState('')
  const [createPost, { isLoading: isPosting }] = useCreatePostMutation()
  // search query and results
  const [searchText, setSearchText] = useState('')
  const [searchContent, setSearchContent] = useState<any>(null)
  const [searchResult, setSearchResult] = useState<any>(null)
  const [searchQuery, { isLoading: isSearching }] = useGetPostsInSearchMutation()

  // main query in the page
  const { data: posts, isLoading, isSuccess, isError, error } = useGetPostsAsNewsQuery({})
  // handle query options
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

  // handle Searching function
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
    e.preventDefault()
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
      window.location.reload();
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

  // when the user type somthing in the search bar do the job for him
  useEffect(() => {
    if (searchText !== '')
      handleSearch()
  }, [searchText])

  return (
    <div className="home-page-container">

      {/* search bar and post form */}
      <div className="home-actions">
        <div className="home-search">
          <input type="text" placeholder="Search" value={searchText} onChange={e => setSearchText(e.target.value)} />
          <button className="home-create-post" onClick={() => { setShowPostForm(!showPostForm) }}>Add Post</button>
        </div>
        {showPostForm && (
          <div className="home-post-form">
            <form>
              <input type="file" accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => setFile(e.target.files[0])} />
              <textarea placeholder="Enter your post" onChange={e => setPostText(e.target.value)} value={postText} />
              {errMsg && <div className="error-message">{errMsg}</div>}
              <button type="submit" onClick={handleCreate}>{isPosting ? 'Posting...' : 'Post'}</button>
            </form>
          </div>
        )}
      </div>

      {/* here goes the content */}
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