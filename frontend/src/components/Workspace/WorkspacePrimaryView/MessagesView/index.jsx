import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, updateMessageUnreads } from "../../../../store/messages";
import MessageItem from "./MessageItem";
import './MessagesView.css'

const MessagesView = ({ messageableId }) => {
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const messages = useSelector(getMessages);
    const dispatch = useDispatch();
    const unreadMessages = messages.filter(message => message.unread && message.workspaceAuthorId !== workspaceUserId)
    const readMessages = messages.filter(message => message.workspaceAuthorId === workspaceUserId  || !message.unread)

    useEffect(() => {
        console.log("working");
        unreadMessages.forEach((message) => {
            dispatch(updateMessageUnreads(message, messageableId));
        })
    }, [messageableId])

    useEffect(() => {
        console.log("working");
        unreadMessages.forEach((message) => {
            dispatch(updateMessageUnreads(message, messageableId));
        })
    }, [])

    return (
        <div className="primary-messages">
            {readMessages.map((message) => (
                <div key={`m${message.id}`}>
                    <MessageItem message={message} />
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