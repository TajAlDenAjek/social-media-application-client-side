import React from 'react'
import { ReactionType } from '../../features/reaction/reactionApiSlice'
import { Link } from 'react-router-dom'
type ReactionProps = {
    reaction: ReactionType,
    isSameUser?: boolean
} | any


import './reaction.css'
const Reaction: React.FC<ReactionProps> = ({ reaction, isSameUser }) => {


    const content = (
        <div className="reaction-container">
            <span className='reaction-info'>
                <span className="reaction-text">
                    {isSameUser && 'You'}
                    <Link to={`/userProfile/${reaction.userId}`}>
                        <h4>{reaction.User.username}</h4>
                    </Link>
                    <p>
                        {reaction.state == "like" ? "Liked" : "Disliked"} this
                        <Link to={`/post/${reaction.postId}`}>
                            post
                        </Link>

                    </p>

                </span>
                {/* {
                    isSameUser &&
                    <div className="reaction-actions">
                        here
                    </div>
                } */}
            </span>
        </div>
    )
    return content;
}

export default Reaction