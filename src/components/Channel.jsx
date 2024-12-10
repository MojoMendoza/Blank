import React, { useState, useEffect } from 'react';
import CreateChannel from './CreateChannel';
import ChannelList from './ChannelList';
import GroupChat from './GroupChat';
import UserListSidebar from './UserListSidebar';
import { getAllChannels } from "../services/apiService";
import { getMessages } from "../services/apiService";
import './Channel.css';

function Channel() {
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [usersInChannel, setUsersInChannel] = useState([]);

    useEffect(() => {
        getAllChannels()
            .then((response) => {
                const channelsData = response.data.data;
                if (Array.isArray(channelsData)) {
                    setChannels(channelsData);
                }
            })
            .catch((error) => {
                console.error("Error fetching channels:", error);
            });
    }, []);

    // Fetch users based on selected channel's messages
    useEffect(() => {
        if (selectedChannel) {
            getMessages(selectedChannel.id, 'Channel')
                .then((response) => {
                    const messages = response.data.data;
                    const users = [];

                    messages.forEach((message) => {
                        if (!users.some(user => user.id === message.sender.id)) {
                            users.push(message.sender);
                        }
                    });

                    setUsersInChannel(users);
                })
                .catch((error) => {
                    console.error("Error fetching messages:", error);
                });
        }
    }, [selectedChannel]);

    const handleSelectChannel = (channel) => {
        setSelectedChannel(channel);
    };

    const handleAddChannel = (newChannel) => {
        setChannels((prevChannels) => [...prevChannels, newChannel]);
    };

    return (
        <div className="channel-container">
            <aside className="channel-sidebar">
                <CreateChannel onAddChannel={handleAddChannel} />
                <ChannelList channels={channels} onChannelSelect={handleSelectChannel} />
            </aside>
            <main className="channel-main">
                <GroupChat selectedChannel={selectedChannel} />
            </main>
            <aside className="user-list-sidebar-container">
                <UserListSidebar users={usersInChannel} />
            </aside>
        </div>
    );
}

export default Channel;
