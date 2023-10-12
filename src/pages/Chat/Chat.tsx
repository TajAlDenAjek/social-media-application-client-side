import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initStateReducer, addMessage } from '../../features/chat/chatSlice'
import { selectCurrentToken, selectCurrentId } from '../../features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { fetchImage } from '../../components/SimpleImageFetcher'
import { useGetMessagesQuery } from '../../features/chat/chatApiSlice'
import { io } from 'socket.io-client'
import { selectCurrentChat } from '../../features/chat/chatSlice'
import Message from '../../components/Message/Message'
let SERVER_SIDE = import.meta.env.VITE_REACT_API_KEY
const socket = io(String(SERVER_SIDE))
import './chat.css'

const Chat = () => {
    const [profilePicture, setProfilePicture] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const [messageText, setMessageText] = useState('')
    const { user } = location.state
    const token = useSelector(selectCurrentToken)
    const id = useSelector(selectCurrentId)
    const {
        data: messages,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetMessagesQuery(user.id,{ refetchOnMountOrArgChange: true })
    let content
    useEffect(()=>{
        socket.off('Receive Message');
    },[])

    const handleMessage = () => {
        if (messageText !== '') {
            socket.emit("Send Message", { id: user.id, message: messageText, token });
            setMessageText("");
        }
    }
    // normal fetch request to a static image on the backend 
    useEffect(() => {
        if (user.picturePath)
            fetchImage(user.picturePath, setProfilePicture, token)
        else if (user.picturePath === null)
            fetchImage('default.png', setProfilePicture, token)
    }, [])
    useEffect(() => {
        if (isLoading) {
            content = <h1>Loading...</h1>
        } else if (isSuccess) {
            dispatch(initStateReducer(messages))
            socket.emit('Add User', { token })
            socket.on("Receive Message", (data) => {
                console.log(data)
                dispatch(addMessage(data));
            });
        } else if (isError) {
            content = <div>{error.toString()}</div>
        }

    }, [isSuccess])

    const chat = useSelector(selectCurrentChat);
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
                    {
                        chat.map((message, index) => (
                            <Message key={index} message={message}/>
                        ))
                    }
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