import { useState } from "react";
import { useSelector } from "react-redux";
import { getMessages } from "../../../../store/messages";
import MessageItem from "./MessageItem";

const MessagesView = () => {
    const messages = useSelector(getMessages);

    return (
        <div className="primary-messages">
            {messages.map((message) => (
                <MessageItem message={message} />
            ))}
        </div>
    )
}

export default MessagesView;