import React, { useState, useEffect } from 'react';
import { sendMessage, getChannelDetails, getMessages } from '../services/apiService';
import AddUserModal from './AddUserModal';
import './GroupChat.css';

function GroupChat({ selectedChannel }) {
    const [channelDetails, setChannelDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentUser = localStorage.getItem('userId');
    const pollingInterval = 3000;

    useEffect(() => {
        let interval;

        if (!selectedChannel?.id) return;

        setMessages([]);
        setChannelDetails(null);
        setLoading(true);
        setError('');

        // Fetch channel details
        getChannelDetails(selectedChannel.id)
            .then((response) => {
                setChannelDetails(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching channel details:', err);
                setError('Failed to load channel details.');
                setLoading(false);
            });

        // Start polling messages
        const startPolling = () => {
            interval = setInterval(() => {
                if (selectedChannel?.id) {
                    fetchMessages(selectedChannel.id, 'Channel');
                }
            }, pollingInterval);
        };

        startPolling();
        fetchMessages(selectedChannel.id, 'Channel');

        return () => {
            clearInterval(interval);
        };
    }, [selectedChannel]);

    const fetchMessages = (channelId, receiverType) => {
        getMessages(channelId, receiverType)
            .then((response) => {
                const messageData = response.data.data;
                if (Array.isArray(messageData)) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        ...messageData.filter(
                            (message) =>
                                !prevMessages.some((prevMessage) => prevMessage.id === message.id)
                        ),
                    ]);
                }
            })
            .catch((error) => {
                console.error('Error fetching messages', error);
            });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (messageBody.trim()) {
            setIsSending(true);
            try {
                await sendMessage(selectedChannel.id, 'Channel', messageBody);
                setMessageBody('');
                setIsSending(false);
                fetchMessages(selectedChannel.id, 'Channel');
            } catch (error) {
                console.error('Error sending message:', error);
                setError('Failed to send the message.');
                setIsSending(false);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return 'Invalid Date';
        return date.toLocaleString();
    };

    const renderMessages = () => {
        return messages.map((message) => {
            const isSender = message.sender.id == currentUser;
            return (
                <div
                    key={message.id}
                    className={`chat-message ${isSender ? 'chat-sender' : 'chat-receiver'}`}
                >
                    <div className="message-header">
                        <span className="message-sender">
                            {isSender ? 'You' : message?.sender.uid}
                        </span>
                        <span className="message-time">
                            {formatDate(message.created_at)}
                        </span>
                    </div>
                    <div className="message-body">{message.body}</div>
                </div>
            );
        });
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (!selectedChannel) {
        return <div className="no-chat-selected">Please select a channel to start chatting.</div>;
    }

    return (
        <div className="chat-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : channelDetails ? (
                <div className="">
                    <h2>{channelDetails.name}</h2>
                    <p><strong>Created At:</strong> {formatDate(channelDetails.created_at)}</p>
                    <button onClick={handleOpenModal}>Add Users to Channel</button>
                </div>
            ) : (
                <p>Please Select a channel</p>
            )}

            <div className="chat-messages">{renderMessages()}</div>

            <div className="chat-input-container">
                <textarea
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button
                    type="submit"
                    onClick={handleSendMessage}
                    disabled={!messageBody.trim() || isSending}
                    className={`chat-send-button`}
                >
                    {isSending ? 'Sending...' : 'Send'}
                </button>
            </div>

            <AddUserModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                channelId={selectedChannel?.id}
            />
        </div>
    );
}

export default GroupChat;
