import React, { useState } from "react";

const SendMessage = ({ recipients, onSendMessage }) => {
    const [messageBody, setMessageBody] = useState("");
    const [selectedRecipient, setSelectedRecipient] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (messageBody.trim() && selectedRecipient) {
            onSendMessage(selectedRecipient, messageBody);
            setMessageBody("");
            setSelectedRecipient("");
        }
    };

    return (
        <div className="send-message-section">
            <h3>Send Message</h3>
            <form className="send-message-form" onSubmit={handleSendMessage}>
                <div className="recipient-dropdown">
                    <label htmlFor="recipient">Select Recipient: </label>
                    <select
                        id="recipient"
                        value={selectedRecipient}
                        onChange={(e) => setSelectedRecipient(e.target.value)}
                    >
                        <option value="">--Select Recipient--</option>
                        {Array.isArray(recipients) && recipients.length > 0 ? (
                            recipients.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.uid}
                                </option>
                            ))
                        ) : (
                            <option disabled>No users available</option>
                        )}
                    </select>
                </div>

                <textarea
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default SendMessage;
