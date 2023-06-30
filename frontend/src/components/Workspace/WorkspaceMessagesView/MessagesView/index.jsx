import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, updateMessageUnreads } from "../../../../store/messages";
import DirectMessageTopDetails from "./MessageScrollDirectTop";
import ChannelTopDetails from "./MessageScrollChannelTop";
import MessageItem from "./MessageItem/Index";
import './MessagesView.css'

const MessagesView = ({ messageableId, messageableType, messageMembersArr }) => {
    const messagesEndRef = useRef(null)
    const dispatch = useDispatch();
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const messages = useSelector(getMessages);
    const unreadMessages = messages.filter(message => message.unread && message.workspaceAuthorId !== workspaceUserId)
    const firstUnreadMessage = unreadMessages[0];
    // const [unreadMessages, setUnreadMessages] = useState(initialUnreadMessages)
    // const [readMessages, setReadMessages] = useState(initialReadMessages)
    
    useEffect(() => {
        if (unreadMessages.length > 0) {
            unreadMessages.forEach((message) => {
                dispatch(updateMessageUnreads(message, messageableId, messageableType));
            });
        }
        scrollToBottom();
    }, [])


    useEffect(() => {
        unreadMessages.forEach((message) => {
            dispatch(updateMessageUnreads(message, messageableId, messageableType));
        });
        scrollToBottom();
    }, [messageableId])

    // useEffect(() => {
    //     if (messages.length > 0 && messages[messages.length - 1].workspaceAuthorId === workspaceUserId) {
    //         setReadMessages(messages)
    //         setUnreadMessages([])
    //     }
    // }, [messages, messageableId])
    
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
                            <div className="new-messages-line">
                                <hr></hr>
                                <p>New</p>
                            </div>
                        )}
                        <div key={`msg${message.id}`}>
                            <MessageItem  message={message} messageableId={messageableId} messageableType={messageableType} />
                        </div>
                    </>
                ))}
                {/* {Object.values(unreadMessages).length > 0 ?
                    <div className="new-messages-line">
                        <hr></hr>
                        <p>New</p>
                    </div> : <></>} */}
                {/* {unreadMessages.map((message) => (
                    <MessageItem key={`msg${message.id}`} message={message} />
                ))} */}
            </div>
            <div ref={messagesEndRef} />
        </div>
        
    )
}

export default MessagesView;