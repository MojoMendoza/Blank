import React, { useState } from "react";
import UserList from "./UserList";
import Conversation from "./Conversation";
import "./DirectMessage.css";

const DirectMessage = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    // Handle user selection
    const handleUserSelect = (userId) => {
        setSelectedUser(userId);  // Update with selected userId
    };

    return (
        <div className="direct-message">
            <div className="sidebar">
                <UserList onUserSelect={handleUserSelect} />  {/* Pass the function to UserList */}
            </div>

            <div className="main">
                <Conversation selectedUser={selectedUser} />  {/* Pass selectedUser to Conversation */}
            </div>
        </div>
    );
};

export default DirectMessage;
