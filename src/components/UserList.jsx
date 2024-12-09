import React, { useState, useEffect } from "react";
import { getAllUsers } from "../services/apiService";
import "./UserList.css";

const UserListSidebar = ({ onUserSelect }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setLoading(true);
        getAllUsers()
            .then((response) => {
                const usersData = response.data.data;
                if (Array.isArray(usersData)) {
                    setUsers(usersData);
                } else {
                    setError("Unexpected data format.");
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load users. Please try again.");
                setLoading(false);
            });
    }, []);

    const handleUserClick = (user) => {
        onUserSelect(user);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(searchQuery)
    );

    return (
        <aside className="user-list-sidebar">
            <h2>Inbox</h2>
            <input
                type="text"
                className="search-bar"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
            />
            {loading ? (
                <p className="loading">Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <ul className="user-list">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => handleUserClick(user)}
                                className="user-item"
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
                        ))
                    ) : (
                        <p className="no-users">No users found.</p>
                    )}
                </ul>
            )}
        </aside>
    );
};

export default UserListSidebar;
