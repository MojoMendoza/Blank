import React, { useState, useEffect } from 'react';
import { getAllUsers, addUserToChannel } from '../services/apiService';
import './AddUserModal.css';

function AddUserModal({ isOpen, onClose, channelId }) {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setError('');
            getAllUsers()
                .then((response) => {
                    setUsers(response.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching users:', err);
                    setError('Failed to load users.');
                    setLoading(false);
                });
        }
    }, [isOpen]);

    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleAddUsers = async () => {
        try {
            const addUserPromises = selectedUsers.map(userId =>
                addUserToChannel(channelId, userId)
            );
            await Promise.all(addUserPromises);
            console.log(selectedUsers);
            onClose();
        } catch (error) {
            console.error('Error adding users:', error);
            setError('Failed to add users to the channel.');
        }
    };


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery)
    );

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Add Users to Channel</h3>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>

                {loading ? (
                    <p>Loading users...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <>
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />

                        <div className="user-list">
                            {filteredUsers.map((user) => (
                                <div key={user.id} className="user-item">
                                    <input
                                        type="checkbox"
                                        id={`user-${user.id}`}
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => handleUserSelect(user.id)}
                                    />
                                    <label htmlFor={`user-${user.id}`}>{user.email}</label>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="modal-footer">
                    <button onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                    <button
                        onClick={handleAddUsers}
                        className="add-button"
                        disabled={selectedUsers.length === 0}
                    >
                        Add Users
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddUserModal;
