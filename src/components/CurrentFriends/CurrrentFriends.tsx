import Users from '../Users/Users'
import { useGetFriendsQuery } from '../../features/relationships/relationshipsApiSlice'
import { UserType } from '../../features/user/userApiSlice'
import './currentfriends.css'


const CurrrentFriends = () => {
    // main query in the page
    const { data: friendUsers, isLoading, isSuccess, isError, error } = useGetFriendsQuery({})

    // handle query options
    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {

        let friends: any = friendUsers
        let users: UserType[] = []
        friends.forEach((friend: any) => {
            users.push({ ...friend.friend,relationId:friend.id })
        });
        content = <Users users={users} removeFriend={true} blockFriend={true} />
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    return content;
}

export default CurrrentFriends