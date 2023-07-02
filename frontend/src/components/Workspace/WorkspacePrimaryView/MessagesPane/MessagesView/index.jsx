import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getMessages } from "../../../../../store/messages";
import DirectMessageTopDetails from "./MessageScrollDirectTop";
import ChannelTopDetails from "./MessageScrollChannelTop";
import MessageItem from "./MessageItem/Index";
import './MessagesView.css'

const MessagesView = ({ messageableId, messageableType, messageMembersArr }) => {
    const messagesEndRef = useRef(null)
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const messages = useSelector(getMessages);
    const unreadMessages = messages.filter(message => message.unread && message.workspaceAuthorId !== workspaceUserId)
    const firstUnreadMessage = unreadMessages[0];
    // const [unreadMessages, setUnreadMessages] = useState(initialUnreadMessages)
    // const [readMessages, setReadMessages] = useState(initialReadMessages)
    
    useEffect(() => {
        scrollToBottom();
    }, [messages, messageableId])
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="message-scroll-container">
            <div className="messageable-details">
                {messageableType === 'channel' ? 
                    <ChannelTopDetails messageableId={messageableId}/> : 
                    <DirectMessageTopDetails messageMembersArr={messageMembersArr} messageableId={messageableId} />
                }
            </div>
            <div className="primary-messages">
                {messages.map((message) => (
                    <>
                        { unreadMessages.length > 0 && message.id === firstUnreadMessage.id && (
                            <div key={`nms${message.id}`} className="new-messages-line">
                                <hr></hr>
                                <p>New</p>
                            </div>
                        )}
                        <div key={`msg${message.id}`}>
                            <MessageItem  message={message} messageableId={messageableId} messageableType={messageableType} />
                        </div>
                    </>
                ))}
            </div>
            <div ref={messagesEndRef} />
        </div>
        
    )
}

export default MessagesView;