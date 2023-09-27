import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../features/auth/authSlice'
import { useLogoutMutation } from '../../features/auth/authApiSlice'

const Home = () => {
  const dispatch=useDispatch()
  const [logingOut]=useLogoutMutation()
  const handleLogout=async(e:any)=>{
    try {
      await logingOut({})
      dispatch(logOut())
    } catch (error) {
      
    }
  }
  return (
    <>
      <h1>you are authorized to see this</h1>
      <button onClick={handleLogout}>logout</button>
    </>
  )
}

export default Home