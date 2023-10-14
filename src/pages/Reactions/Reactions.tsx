import React from 'react'
import { useGetReactionsQuery, ReactionType } from '../../features/reaction/reactionApiSlice'
import Reaction from '../../components/Reaction/Reaction'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../../features/auth/authSlice'
import './reactions.css'

type ReactionsProps = {
    userId: number | string,
}
const Reactions: React.FC<ReactionsProps> = ({ userId }) => {
    const id = useSelector(selectCurrentId)
    const {
        data: reactions,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetReactionsQuery(userId)
    let isSameUser = (Number(id) === Number(userId))
    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {
        content = reactions.map((reaction: ReactionType, index: number) => (
            <Reaction reaction={reaction} key={index} isSameUser={isSameUser} />
        ))
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    return (
        <div className="reactions-page-container">
            {content}
        </div>
    )
}

export default Reactions