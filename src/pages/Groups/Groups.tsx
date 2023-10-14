import React, { useEffect, useState } from 'react'
import { useGetGroupsQuery } from '../../features/group/groupApiSlice';
import { GroupType } from '../../features/group/groupApiSlice';
import './groups.css'


const Groups = () => {

    const {
        data: groups,
        isSuccess,
    } = useGetGroupsQuery({})

    useEffect(() => {

    }, [isSuccess])
    console.log(groups)
    const [activeTab, setActiveTab] = useState('global');
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="groups-container">
            <div className="groups-tabs">
                <div
                    className={`groups-tab ${activeTab === 'global' ? 'active' : ''}`}
                    onClick={() => handleTabClick('global')}
                >
                    Global Groups
                </div>
                <div
                    className={`groups-tab ${activeTab === 'my-groups' ? 'active' : ''}`}
                    onClick={() => handleTabClick('my-groups')}
                >
                    My groups
                </div>
                <div
                    className={`groups-tab ${activeTab === 'pending-sent' ? 'active' : ''}`}
                    onClick={() => handleTabClick('pending-sent')}
                >
                    Pending Sent Requests
                </div>
            </div>
            <div className="groups-content">
                <div className={`groups-page ${activeTab === 'global' ? 'active' : ''}`}>
                    global groups
                </div>
                <div className={`groups-page ${activeTab === 'my-groups' ? 'active' : ''}`}>
                    my groups
                </div>
                <div className={`groups-page ${activeTab === 'pending-sent' ? 'active' : ''}`}>
                    pending requests
                </div>
            </div>
        </div>
    )
}

export default Groups