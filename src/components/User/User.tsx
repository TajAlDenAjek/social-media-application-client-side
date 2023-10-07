import React,{useState,useEffect} from 'react'
import { UserType } from '../../features/user/userApiSlice'
import { Link } from 'react-router-dom'
import { fetchImage } from '../SimpleImageFetcher'
import './user.css'
import { selectCurrentToken } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
type UserProps = {
    user: UserType,
    sendFriendRequst?: boolean,
    removeFriendRequest?: boolean,
    removeFriend?: boolean,
    blockFriend?: boolean,
    receivedFriendRequest?: boolean,
    unBlockUser?: boolean,
}
const User: React.FC<UserProps> = ({ user }) => {
    const [profilePicture, setProfilePicture] = useState('')
    const token=useSelector(selectCurrentToken)
    // normal fetch request to a static image on the backend 
    useEffect(() => {
        if (user.picturePath)
            fetchImage(user.picturePath, setProfilePicture, token)
        else if (user.picturePath === null)
            fetchImage('default.png', setProfilePicture, token)
    }, [])
    return (
        <div className="user-container">
            <img src={profilePicture} alt="Profile Picture" className="user-profile-picture" />
            <Link to={`/userProfile/${user.id}`}>
                <h3 className="user-username">{user.username}</h3>
            </Link>
        </div>
    )
}

export default User