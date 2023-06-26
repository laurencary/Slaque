import { useSelector } from "react-redux";
import { getMessages } from "../../../../store/messages";

const MessagesView = () => {
    const messages = useSelector(getMessages);

    return (
        <div className="primary-messages">
            {messages.map((message) => (
                <div key={message.id} className="message-item">
                    <div className="message-item-actions-container">
                        <div className="message-item-actions">
                            <svg viewBox="0 0 20 20">
                                <path fill="currentColor" fill-rule="evenodd" d="M10 5.5A1.75 1.75 0 1 1 10 2a1.75 1.75 0 0 1 0 3.5Zm0 6.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm-1.75 4.5a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0Z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="message-author-photo img-placeholder"></div>
                    <div className="message-details">
                        <div className="message-header">
                            <p className="message-author">{message.authorName}</p>
                            <p className="message-time">{message.createdAt}</p>
                        </div>
                        <p className="message-content">{message.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MessagesView;