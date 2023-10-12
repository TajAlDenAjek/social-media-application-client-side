import React from 'react'
import { MessageType } from '../../features/chat/chatSlice'
import { selectCurrentId } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
import './message.css'


type MessageProps = {
    message: MessageType
}


const Message: React.FC<MessageProps> = ({ message }) => {
    const dateString: any = message.createdAt;
    const dateObj = new Date(dateString);

    const year = dateObj.getFullYear();
    const time = dateObj.toLocaleTimeString();
    const id = useSelector(selectCurrentId)
    return (
        <div className={id === message.senderUserId ? 'myMessage' : 'friendMessage'}>
            <p className="message-content"> {message.message}</p>
            {/* <div className={`message-timestamp-${id === message.senderUserId ? 'right' : 'left'}`}> {time}</div> */}
        </div>
    )
}

export default Message