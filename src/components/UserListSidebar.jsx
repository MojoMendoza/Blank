import React from "react";
import "./UserList.css";

const UserListSidebar = ({ users, onUserSelect }) => {

    const handleUserClick = (user) => {
        console.log(user);
    };

    return (
        <div className="user-list-sidebar">
            <h2>Users in Channel</h2>
            {users.length > 0 ? (
                <ul className="user-list">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="user-item"
                            onClick={() => handleUserClick(user)}
                        >
                            <div className="user-avatar">
                                <img
                                    src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${user.email}`}
                                    alt={user.email}
                                />
                            </div>
                            <div className="user-details">
                                <p className="user-name">{user.email || "Unknown User"}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-users">No users found.</p>
            )}
        </div>
    );
};

export default UserListSidebar;
