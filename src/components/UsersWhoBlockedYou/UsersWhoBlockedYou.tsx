import Users from '../Users/Users'
import { useGetWhoBlockedYouUsersQuery } from '../../features/relationships/relationshipsApiSlice'
import { UserType } from '../../features/user/userApiSlice'
import './userswhoblockedyou.css'

const UsersWhoBlockedYou = () => {
    // main query in the page
    const { data: Relationships, isLoading, isSuccess, isError, error } = useGetWhoBlockedYouUsersQuery({})

    // handle query options
    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {

        let relations: any = Relationships
        let users: UserType[] = []
        relations.forEach((relation: any) => {
            users.push({ ...relation.userBlockedMe })
        });
        content = <Users users={users} removeFriend={true} blockFriend={true} />
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    return content;
}

export default UsersWhoBlockedYou