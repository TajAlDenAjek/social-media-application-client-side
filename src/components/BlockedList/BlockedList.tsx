import Users from '../Users/Users'
import { useGetBlockedUsersQuery } from '../../features/relationships/relationshipsApiSlice'
import { UserType } from '../../features/user/userApiSlice'
import './blockedlist.css'

const BlockedList = () => {
    // main query in the page
    const { data: Relationships, isLoading, isSuccess, isError, error } = useGetBlockedUsersQuery({})

    // handle query options
    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {

        let relations: any = Relationships
        let users: UserType[] = []
        relations.forEach((relation: any) => {
            users.push({ ...relation.blockedUser })
        });
        content = <Users users={users} removeFriend={true} blockFriend={true} />
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    return content;
}

export default BlockedList