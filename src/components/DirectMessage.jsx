import React, { useState } from "react";
import UserList from "./UserList";
import Conversation from "./Conversation";
import "./DirectMessage.css";

const DirectMessage = () => {

    const [selectedUser, setSelectedUser] = useState('');
    const handleUserSelect = (user) => {
        setSelectedUser(user)
    };

    return (
        <div className="direct-message">
            <div className="sidebar">
                <UserList onUserSelect={handleUserSelect} />
            </div>

            <div className="main">
                <Conversation selectedUser={selectedUser} />
            </div>
        </div>
    );
};

export default DirectMessage;
