import React, { useState } from 'react';
import GlobalUsersSearch from '../../components/GlobalUsersSearch/GlobalUsersSearch';
import './friends.css'




const Friends: React.FC = () => {
    const [activeTab, setActiveTab] = useState('global');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="friends-container">
            <div className="friends-tabs">
                <div
                    className={`friends-tab ${activeTab === 'global' ? 'active' : ''}`}
                    onClick={() => handleTabClick('global')}
                >
                    Global Users
                </div>
                <div
                    className={`friends-tab ${activeTab === 'my-friends' ? 'active' : ''}`}
                    onClick={() => handleTabClick('my-friends')}
                >
                    My Friends
                </div>
                <div
                    className={`friends-tab ${activeTab === 'pending-sent' ? 'active' : ''}`}
                    onClick={() => handleTabClick('pending-sent')}
                >
                    Pending Sent Requests
                </div>
                <div
                    className={`friends-tab ${activeTab === 'pending-received' ? 'active' : ''}`}
                    onClick={() => handleTabClick('pending-received')}
                >
                    Pending Received Requests
                </div>
                <div
                    className={`friends-tab ${activeTab === 'blocked-by-you' ? 'active' : ''}`}
                    onClick={() => handleTabClick('blocked-by-you')}
                >
                    Blocked Users by You
                </div>
                <div
                    className={`friends-tab ${activeTab === 'blocked-you' ? 'active' : ''}`}
                    onClick={() => handleTabClick('blocked-you')}
                >
                    Users Who Blocked You
                </div>
            </div>
            <div className="friends-content">
                <div className={`friends-page ${activeTab === 'global' ? 'active' : ''}`}>
                    <GlobalUsersSearch/>
                </div>
                <div className={`friends-page ${activeTab === 'my-friends' ? 'active' : ''}`}>
                    Content for My Friends
                </div>
                <div className={`friends-page ${activeTab === 'pending-sent' ? 'active' : ''}`}>
                    Content for Pending Sent Requests
                </div>
                <div className={`friends-page ${activeTab === 'pending-received' ? 'active' : ''}`}>
                    Content for Pending Received Requests
                </div>
                <div className={`friends-page ${activeTab === 'blocked-by-you' ? 'active' : ''}`}>
                    Content for Blocked Users by You
                </div>
                <div className={`friends-page ${activeTab === 'blocked-you' ? 'active' : ''}`}>
                    Content for Users Who Blocked You
                </div>
            </div>
        </div>
    );
};

export default Friends;