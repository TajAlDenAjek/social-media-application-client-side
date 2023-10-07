import React, { useState, useEffect } from 'react'
import { useGetProfileMutation, UserProfile } from '../../features/user/userApiSlice';
import { fetchImage } from "../../components/SimpleImageFetcher";
import { useSelector } from 'react-redux';
import { selectCurrentToken,selectCurrentId } from '../../features/auth/authSlice';
import Reactions from '../Reactions/Reactions';
import Posts from '../Posts/Posts';
import Comments from '../Comments/Comments';
import { Link } from 'react-router-dom';


import './userprofilepage.css'


type ResultProfileType = {
  data: any | UserProfile
} | any


const UserProfilePage = () => {
  // requested user id 
  const curId = location.pathname.split('/')[2];
  const id=useSelector(selectCurrentId)
  // Intial User State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: '', password: '', email: '',
    createdAt: '', firstName: '', lastName: '',
    gender: 'male', birthday: '', country: '',
    picturePath: '', state: undefined
  })

  const [notAuthorized, setNotAuthorized] = useState(false)
  const [option, setOption] = useState('posts')
  const [img, setImg] = useState('')
  const [getUserProfile, { isLoading, isError, error }] = useGetProfileMutation()
  const token = useSelector(selectCurrentToken)

  // get profile info from the backend server
  const GetProfile = async () => {
    try {
      // query request 
      const result: ResultProfileType = await getUserProfile({ id: curId })
      let data: ResultProfileType = result.data
      // set the recevied values 
      Object.keys(data).map((attribute: any) => {
        // to keep controlling the html values 
        if (data[attribute] === null)
          data = { ...data, [attribute]: 'no info' }
        if (data[attribute] === null && attribute === 'state')
          data = { ...data, [attribute]: 'not friends' }
        // show only the year month and day from Date values
        if (attribute === 'createdAt' || (attribute === 'birthday' && data[attribute]))
          data = { ...data, [attribute]: data[attribute].slice(0, 10) }
        // update new state
        setUserProfile(prevState => ({
          ...prevState,                 // rest values 
          [attribute]: data[attribute], // new value to update
        }))
      })
    } catch (error) {
    }
  }
  // first get the data from the backend
  useEffect(() => {
    GetProfile()
  }, [])
  // after that set the image depending on the data
  useEffect(() => {
    if (userProfile.picturePath)
      fetchImage(userProfile.picturePath, setImg, token)
    else if (userProfile.picturePath === undefined)
      fetchImage('default.png', setImg, token)
  }, [userProfile.picturePath])

  const goBack = () => {
    <Link to={String(window.history.back())} />
  };

  const content = (
    isLoading ? <h1>Loading...</h1>
      : (
        <div className="profile-page-container">

          <div className="profile">
            <img src={img} alt="Profile Picture" className="profile-picture" />
            <div className="profile-details">
              <h2>{userProfile.username}</h2>
              {Number(id)!==Number(curId)&&<h2>{userProfile.state}</h2>}
              <p>First Name: {userProfile.firstName}</p>
              <p>Last Name: {userProfile.lastName}</p>
              <p>Gender: {userProfile.gender}</p>
              <p>Birthday: {userProfile.birthday}</p>
              <p>Join Time: {userProfile.createdAt}</p>
              <p>Country:{userProfile.country}</p>
            </div>

            <div className="profile-options">
              <button onClick={goBack}>
                Go Back
              </button>
              <select className="profile-selector" value={option} onChange={e => { setOption(e.target.value) }}>
                <option value="posts">Posts</option>
                <option value="comments">Comments</option>
                <option value="reactions">Reactions</option>
              </select>
            </div>
          </div>
          <hr />
          {
            option === 'posts'
              ? <Posts userId={Number(curId)} />
              : option === 'comments'
                ? <Comments userId={Number(curId)} />

                : <Reactions userId={Number(curId)} />
          }
        </div>
      )
  )
  if (notAuthorized) {
    return <h1>you are not authorized to see this profile </h1>
  }
  return content;
}

export default UserProfilePage