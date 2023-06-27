import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, updateMessageUnreads } from "../../../../store/messages";
import MessageItem from "./MessageItem";
import './MessagesView.css'

const MessagesView = ({ messageableId, messageableType }) => {
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
        })
    }, [messageableId])
    
    useEffect(() => {
        unreadMessages.forEach((message) => {
            dispatch(updateMessageUnreads(message, messageableId));
        })
    }, [])
    // if (readMessages.length > 0 && unreadMessages.length > 0) {
    //     if (readMessages[readMessages.length - 1].createdAt > unreadMessages[0].createdAt) {
    //         setReadMessages(messages)
    //         setUnreadMessages([])
    //     }
    // }
    
    return (
        <div className="primary-messages">
            {readMessages.map((message) => (
                <div key={`m${message.id}`}>
                    <MessageItem message={message} messageableId={messageableId} messageableType={messageableType} />
                </div>
            ))}
            { Object.values(unreadMessages).length > 0 ? 
                <div className="new-messages-line">
                    <hr></hr>
                    <p>New</p>
                </div> : <></>}
            {unreadMessages.map((message) => (
                <MessageItem message={message} />
            ))}
        </div>
    )
}

export default MessagesView;