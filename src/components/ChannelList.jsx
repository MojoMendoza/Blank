import React from "react";
import "./ChannelList.css";

const ChannelList = ({ channels, onChannelSelect }) => {

    const handleChannelClick = (channel) => {
        onChannelSelect(channel);
    };

    return (
        <aside className="channel-list-sidebar">
            <h2>Channels</h2>
            <ul className="channel-list">
                {channels.length > 0 ? (
                    channels.map((channel) => (
                        <li
                            key={channel.id}
                            onClick={() => handleChannelClick(channel)}
                            className="channel-item"
                        >
                            <div className="channel-details">
                                <p className="channel-name">{channel.name || "Unnamed Channel"}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="no-channels">No channels found.</p>
                )}
            </ul>
        </aside>
    );
};

export default ChannelList;
