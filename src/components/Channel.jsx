import React, { useState, useEffect } from 'react';
import CreateChannel from './CreateChannel';
import ChannelList from './ChannelList';
import GroupChat from './GroupChat';
import { getAllChannels } from "../services/apiService";
import './Channel.css';

function Channel() {
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState([]);

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
        </div>
    );
}

export default Channel;
