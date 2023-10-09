import Users from '../Users/Users'
import { useGetSentRequestsQuery } from '../../features/relationships/relationshipsApiSlice'
import { UserType } from '../../features/user/userApiSlice'
import './pendingfriendrequests.css'

const PendingFriendRequests = () => {
    // main query in the page
    const { data: pendingRequests, isLoading, isSuccess, isError, error } = useGetSentRequestsQuery({})

    // handle query options
    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {

        let requests: any = pendingRequests
        let users: UserType[] = []
        requests.forEach((request: any) => {
            users.push({ ...request.requestRecevier })
        });
        content = <Users users={users} removeFriend={true} blockFriend={true} />
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    return content;
}

export default PendingFriendRequests