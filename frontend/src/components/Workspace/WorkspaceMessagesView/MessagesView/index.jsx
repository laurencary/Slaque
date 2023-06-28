import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, updateMessageUnreads } from "../../../../store/messages";
import DirectMessageTopDetails from "./MessageScrollDirectTop";
import ChannelTopDetails from "./MessageScrollChannelTop";
import MessageItem from "./MessageItem/Index";
import './MessagesView.css'

const MessagesView = ({ messageableId, messageableType, messageMembersArr }) => {
    const messagesEndRef = useRef(null)
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const messages = useSelector(getMessages);
    const dispatch = useDispatch();
    const unreadMessages = messages.filter(message => message.unread && message.workspaceAuthorId !== workspaceUserId)
    const readMessages = messages.filter(message => message.workspaceAuthorId === workspaceUserId || !message.unread)
    // const [unreadMessages, setUnreadMessages] = useState(initialUnreadMessages)
    // const [readMessages, setReadMessages] = useState(initialReadMessages)

    useEffect(() => {
        unreadMessages.forEach((message) => {
            dispatch(updateMessageUnreads(message, messageableId));
        });
        scrollToBottom();
    }, [messageableId])
    
    useEffect(() => {
        unreadMessages.forEach((message) => {
            dispatch(updateMessageUnreads(message, messageableId));
        });
        scrollToBottom();
    }, [])
    // if (readMessages.length > 0 && unreadMessages.length > 0) {
    //     if (readMessages[readMessages.length - 1].createdAt > unreadMessages[0].createdAt) {
    //         setReadMessages(messages)
    //         setUnreadMessages([])
    //     }
    // }
    
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
                {readMessages.map((message) => (
                    <div key={`m${message.id}`}>
                        <MessageItem message={message} messageableId={messageableId} messageableType={messageableType} />
                    </div>
                ))}
                {Object.values(unreadMessages).length > 0 ?
                    <div className="new-messages-line">
                        <hr></hr>
                        <p>New</p>
                    </div> : <></>}
                {unreadMessages.map((message) => (
                    <MessageItem message={message} />
                ))}
            </div>
            <div ref={messagesEndRef} />
        </div>
        
    )
}

export default MessagesView;