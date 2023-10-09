import Users from '../Users/Users'
import { useGetReceivedRequestsQuery } from '../../features/relationships/relationshipsApiSlice'
import { UserType } from '../../features/user/userApiSlice'
import './receivedrequests.css'

const ReceivedRequests = () => {
    // main query in the page
    const { data: pendingRequests, isLoading, isSuccess, isError, error } = useGetReceivedRequestsQuery({})

    // handle query options
    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {

        let requests: any = pendingRequests
        let users: UserType[] = []
        requests.forEach((request: any) => {
            users.push({ ...request.requestSender })
        });
        content = <Users users={users} removeFriend={true} blockFriend={true} />
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    return content;
}

export default ReceivedRequests