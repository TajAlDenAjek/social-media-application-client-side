import React from 'react'
import User from '../User/User'
import { UserType } from '../../features/user/userApiSlice'
import './users.css'
type UsersProps={
    users:UserType[],
    sendFriendRequst?: boolean,
    removeFriendRequest?: boolean,
    removeFriend?: boolean,
    blockFriend?: boolean,
    receivedFriendRequest?: boolean,
    unBlockUser?: boolean,
}
const Users:React.FC<UsersProps> = ({ users, sendFriendRequst, removeFriendRequest, removeFriend, blockFriend, receivedFriendRequest, unBlockUser }) => {

    const content=users.map((user: UserType, index: number) => (
        <User user={user} key={index}
            sendFriendRequst={sendFriendRequst} 
            removeFriendRequest={removeFriendRequest}
            removeFriend={removeFriend}
            blockFriend={blockFriend}
            receivedFriendRequest={receivedFriendRequest}
            unBlockUser={unBlockUser}
        />
    ))
    return (
        <div className="users-container">
            {content}
        </div>
    );
}

export default Users