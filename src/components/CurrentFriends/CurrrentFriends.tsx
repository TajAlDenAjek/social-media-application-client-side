// import React from 'react'
// import { UserType } from '../../features/user/userApiSlice'
// import User from '../User/User'
// import { useGetFriendsQuery } from '../../features/relationships/relationshipsApiSlice'
// import './currentfriends.css'


// const CurrrentFriends = () => {
//     // main query in the page
//     const { data: users, isLoading, isSuccess, isError, error } = useGetFriendsQuery({})
//     // handle query options
//     let content
//     if (isLoading) {
//         content = <h1>Loading...</h1>
//     } else if (isSuccess) {
//         content = users.map((user: UserType, index: number) => (
//             <Post post={post} key={index} />
//         ))
//     } else if (isError) {
//         content = <div>{error.toString()}</div>
//     }
//     return (
//         <div className='currentFriends-container'>
//             CurrrentFriends123
//         </div>
//     )
// }

// export default CurrrentFriends