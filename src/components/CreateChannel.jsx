import React, { useState } from 'react';
import { createChannel } from "../services/apiService";
import './CreateChannel.css';

function CreateChannel({ onAddChannel }) {
    const [channelName, setChannelName] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleCreate = async () => {
        if (!channelName.trim()) {
            setMessage({ type: 'error', text: 'Channel name cannot be empty.' });
            return;
        }

        try {
            const response = await createChannel(channelName);
            if (response.data) {
                onAddChannel(response.data.data);
                setChannelName('');
                setMessage({ type: 'success', text: 'Channel created successfully!' });
            }
        } catch (error) {
            console.error('Error creating channel:', error);
            setMessage({ type: 'error', text: 'Failed to create channel. Please try again.' });
        }
    };

    return (
        <div className="create-channel-container">
            <h1>Create Channel</h1>
            <input
                className="input-field"
                type="text"
                value={channelName}
                placeholder="New Channel Name"
                onChange={(e) => setChannelName(e.target.value)}
            />
            <button className="btn-create" onClick={handleCreate}>Create</button>
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default CreateChannel;
