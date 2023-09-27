import { Link, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'
import './public.css'

const Public = () => {
  const location = useLocation()

  // check if the user is authenticated -> he don't have to be in the public page 
  const token = useSelector(selectCurrentToken)
  if (token)
    return <Navigate to="/home" state={{ from: location }} replace />

  return (
    <div className="Public-welcome">
      <h2>Welcome to our Social Media App!</h2>
      <p>Thank you for joining us. <br/> Get started by creating an account.</p>
      <Link to="/register" className="Public-button">Register Page</Link>
    </div>
  )
}

export default Public