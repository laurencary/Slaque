import { useState } from "react";

const MessageItem = ({ message }) => {
    const [showActions, setShowActions] = useState(false)
    const [showActionDropDown, setShowActionDropdown] = useState(false)

    return (
        <div key={message.id} className="message-item"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            >
            <div className="message-author-photo img-placeholder"></div>
            <div className="message-details">
                <div className="message-header">
                    <p className="message-author">{message.authorName}</p>
                    <p className="message-time">{message.createdAt}</p>
                </div>
                <p className="message-content">{message.content}</p>
            </div>
            <div className={showActions ? "message-item-actions-container" : "hidden"}>
                <div className="message-item-actions" onClick={() => setShowActionDropdown(true)}>
                    <svg viewBox="0 0 20 20" className="message-items-actions-icon">
                        <path fill="currentColor" d="M10 5.5A1.75 1.75 0 1 1 10 2a1.75 1.75 0 0 1 0 3.5Zm0 6.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm-1.75 4.5a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default MessageItem;