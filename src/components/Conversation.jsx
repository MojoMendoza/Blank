import React, { useState, useEffect } from "react";
import { getMessages, sendMessage } from "../services/apiService";
import "./Conversation.css";

function Conversation({ selectedUser }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const currentUser = localStorage.getItem("userId");
    const pollingInterval = 3000;

    useEffect(() => {
        let interval;

        const startPolling = () => {
            interval = setInterval(() => {
                if (selectedUser) {
                    console.log('refreshed');
                    fetchMessages(selectedUser.id, true);
                }
            }, pollingInterval);
        };

        if (selectedUser) {
            fetchMessages(selectedUser.id);
            startPolling();
        }

        return () => {
            clearInterval(interval);
        };
    }, [selectedUser]);

    const fetchMessages = (userId, isPolling = false) => {
        getMessages(userId, 'User')
            .then((response) => {
                const messageData = response.data.data;
                if (Array.isArray(messageData)) {
                    if (isPolling) {
                        if (messageData.length > messages.length) {
                            setMessages(messageData);
                        }
                    } else {
                        setMessages(messageData);
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching messages", error);
            });
    };

    const formatDate = (createdAt) => {
        const messageDate = new Date(createdAt);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (messageDate.toDateString() === today.toDateString()) {
            return `Today at ${messageDate.toLocaleTimeString()}`;
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
            return `Yesterday at ${messageDate.toLocaleTimeString()}`;
        } else {
            return messageDate.toLocaleDateString();
        }
    };

    const handleSend = () => {
        if (newMessage.trim()) {
            const newMessageObject = {
                id: new Date().toISOString(),
                body: newMessage,
                created_at: new Date().toISOString(),
                sender: { id: currentUser },
                receiver: { id: selectedUser.id },
            };

            sendMessage(selectedUser.id, 'User', newMessage)
                .then(() => {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        newMessageObject,
                    ]);
                    setNewMessage("");
                })
                .catch((error) => {
                    console.error("Error sending message", error);
                });
        }
    };

    const renderMessages = () => {
        return messages.map((message) => {
            const isSender = message.sender.id == currentUser;
            return (
                <div
                    key={message.id}
                    className={`chat-message ${isSender ? "chat-sender" : "chat-receiver"}`}
                >
                    <div className="message-header">
                        <span className="message-sender">
                            {isSender ? "You" : selectedUser.email}
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

    return (
        <div className="chat-container">
            {selectedUser ? (
                <>
                    <div className="chat-header">
                        <h2>{selectedUser.email}</h2>
                    </div>
                    <div className="chat-messages">
                        {renderMessages()}
                    </div>
                    <div className="chat-input-container">
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button className="chat-send-button" onClick={handleSend}>
                            Send
                        </button>
                    </div>
                </>
            ) : (
                <div className="no-chat-selected">
                    <h3>Please select a user to start a conversation.</h3>
                </div>
            )}
        </div>
    );
}

export default Conversation;
