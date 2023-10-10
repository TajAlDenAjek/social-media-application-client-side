import React, { useState, useEffect } from 'react'
import User from '../../components/User/User'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'
import { Link } from 'react-router-dom'
import './chat.css'
import { useLocation } from 'react-router-dom'
import { fetchImage } from '../../components/SimpleImageFetcher'
const Chat = () => {
    const [profilePicture, setProfilePicture] = useState('')
    const location = useLocation()
    const [messageText, setMessageText] = useState('')
    const { user } = location.state
    const token = useSelector(selectCurrentToken)



    const handleMessage=async()=>{

    }
    // normal fetch request to a static image on the backend 
    useEffect(() => {
        if (user.picturePath)
            fetchImage(user.picturePath, setProfilePicture, token)
        else if (user.picturePath === null)
            fetchImage('default.png', setProfilePicture, token)
    }, [])
    return (
        <div className='chat-container'>
            <div className="chat-card">
                <div className="chat-header">
                    <img src={profilePicture} alt="Profile Picture" className="user-profile-picture" />
                    <Link to={`/userProfile/${user.id}`}>
                        <h3 className="user-username">{user.username}</h3>
                    </Link>
                </div>
                <div className="chat-messages">
                    messages go there
                </div>
                <div className="chat-textArea">
                    <input 
                        type="text" 
                        placeholder='type some thing'
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                    />
                    <button onClick={handleMessage}>send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat