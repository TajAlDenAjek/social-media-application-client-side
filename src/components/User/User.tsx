import React, { useState, useEffect } from 'react'
import { UserType } from '../../features/user/userApiSlice'
import { Link } from 'react-router-dom'
import { fetchImage } from '../SimpleImageFetcher'
import './user.css'
import { selectCurrentToken,selectCurrentId } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane ,faXmark,faTrashArrowUp} from '@fortawesome/free-solid-svg-icons'

type UserProps = {
    user: UserType,
    sendFriendRequst?: boolean,
    removeFriendRequest?: boolean,
    removeFriend?: boolean,
    blockFriend?: boolean,
    receivedFriendRequest?: boolean,
    unBlockUser?: boolean,
}
const User: React.FC<UserProps> = ({ user, sendFriendRequst, removeFriendRequest, removeFriend, blockFriend, receivedFriendRequest, unBlockUser }) => {
    const [profilePicture, setProfilePicture] = useState('')
    const token = useSelector(selectCurrentToken)
    const id=useSelector(selectCurrentId)





    // normal fetch request to a static image on the backend 
    useEffect(() => {
        if (user.picturePath)
            fetchImage(user.picturePath, setProfilePicture, token)
        else if (user.picturePath === null)
            fetchImage('default.png', setProfilePicture, token)
    }, [])
    return (
        <div className="user-container">
            <div className='user-info'>
                <img src={profilePicture} alt="Profile Picture" className="user-profile-picture" />
                <Link to={`/userProfile/${user.id}`}>
                    <h3 className="user-username">{user.username}</h3>
                </Link>
            </div>
            <div className="user-actions">
                {
                    (sendFriendRequst&&Number(id)!==Number(user.id))&&
                    <FontAwesomeIcon icon={faPaperPlane} 
                        title='send friend request'
                        className='user-icon user-icon-friendRequest' 
                        // onClick={handleSendFriendRequest}
                    />
                }
                {
                    removeFriend&&
                    <FontAwesomeIcon icon={faXmark}  
                        title='remove friend'
                        className='user-icon user-icon-removeFriend'
                        // onClick={removeFriend}
                    />
                }
                {
                    blockFriend&&
                    <FontAwesomeIcon icon={faTrashArrowUp}  
                        title='block friend'
                        className='user-icon user-icon-blockFriend'
                        // onClick={blockFriend}
                    />
                }
            </div>
        </div>
    )
}

export default User