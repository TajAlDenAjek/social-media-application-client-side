import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentToken, logOut } from '../../features/auth/authSlice'
import { useLogoutMutation } from '../../features/auth/authApiSlice'
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faRobot } from '@fortawesome/free-solid-svg-icons';
import './topbar.css'


const TopBar = () => {
    const token = useSelector(selectCurrentToken)
    const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false)

    const dispatch = useDispatch()
    const [logingOut] = useLogoutMutation()
    const handleLogout = async () => {
        try {
            await logingOut({})
            dispatch(logOut())
        } catch (error) { }
    }
    const content = (
        token ? (
            <nav className="navigation">

                <Link to="/home" className="RobotTitle">ROBOT CHAT <FontAwesomeIcon icon={faRobot} /></Link>
                <button className="navBarDropList" onClick={() => { setIsNavExpanded(!isNavExpanded) }}>
                    <FontAwesomeIcon icon={faList} />
                </button>

                <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                    <ul>
                        <li><Link to="/home">Home</Link> </li>
                        <li><Link to="/groups">Groups</Link></li>
                        <li><Link to="/friends">Friends</Link></li>
                        <li><Link to="/chat">Chat</Link></li>
                        <li><Link to="/notifications">Notifications</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        ) : <></>
    )
    return content;
}

export default TopBar