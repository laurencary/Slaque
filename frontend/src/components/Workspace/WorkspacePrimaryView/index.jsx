import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, fetchMessages, getMessages } from "../../../store/messages";
import { HiOutlineHashtag } from "react-icons/hi";
import './WorkspacePrimaryView.css'
import DirectMessageTopDetails from "./DirectMessageTopDetails";
import ChannelTopDetails from "./ChannelTopDetails";


const WorkspacePrimaryView = () => {
    const { messageableCode, clientId } = useParams();
    const dispatch = useDispatch();
    const messageableType = messageableCode.includes("c") ? "channel" : "directMessage";
    const messages = useSelector(getMessages);
    const messageableId = messageableType === "channel" ? 
        messageableCode.slice(1, 100) * 1 : messageableCode.slice(2, 100) * 1
    const messageName = useSelector(state => {
        // debugger
        if (messageableType === "channel") {
            return state.channels[messageableId].name
        } else {
            const userNameArr = state.directMessages[messageableId].name
            return userNameArr;
        }
    })

    const placeholderMessage = () => {
        if (messageableType === "channel") {
            return "Message #" + messageName
        } else {
            return "Message " + messageName
        }
    }
    const [messageContent, setMessageContent] = useState(placeholderMessage());
 
    let messageDetailsName;
    if (messageableType === "channel") {
        messageDetailsName = messageName;
    } else if (messageName.length > 3) {
        let name = messageName.slice(0, 2).join(', ')
        name = name + ', ' + (messageName.length - 2).toString() + ' others'
        messageDetailsName = name;
    } else {
        messageDetailsName = messageName.join(', ')
    }

    
    const messageMembersArr = useSelector(state => {
        if (messageableType === "channel") {
            return state.channels[messageableId].workspaceUsers
        } else {
            return state.directMessages[messageableId].workspaceUsers
        }
    })

    
    useEffect(() => {
        dispatch(fetchMessages(messageableId, messageableType));
    }, [dispatch, messageableId, messageableType])

    useEffect(() => {
        dispatch(fetchMessages(messageableId, messageableType));
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        let unread_by_workspace_users = {};
        for (const id of messageMembersArr) {
            if (id !== clientId) {
                unread_by_workspace_users[id] = true
            }
        }

        const newMessage = {
            workspace_author_id: clientId,
            content: messageContent,
            edited: false,
            unread_by_workspace_users,
            messageableId,
            messageableType: messageableType === "channel" ? "channel" : "direct_message"
        }
        dispatch(createMessage(newMessage))
    }

    return (
        <div className="workspace-primary-view">
            <div className="primary-header-container">
                <header className="primary-header-name">
                    { messageableType === "channel" ? <HiOutlineHashtag /> : <></> }
                    {messageDetailsName}
                    <span className="sidebar-team-menu-icon">
                        <svg viewBox="0 0 20 20" >
                            <path fill="currentColor" d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06Z"></path>
                        </svg>
                    </span>
                </header>
                <div className="primary-header-users">
                    <span>{messageMembersArr.length}</span>
                </div>
            </div>
            <div className="messageable-details">
                {messageableType === 'channel' ? 
                    <ChannelTopDetails messageableId={messageableId}/> : 
                    <DirectMessageTopDetails messageMembersArr={messageMembersArr}/>
                }
            </div>
            <div className="primary-messages">
                {messages.map((message) => (
                    <div key={message.id} className="message-item">  
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
            <div className="create-message-container">
                <div className="formatting-options"></div>
                <form onSubmit={handleSubmit}>
                    <textarea className="message-textarea"
                        placeholder={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}>
                    </textarea>
                    <button disabled={messageContent === placeholderMessage() && messageContent !== ""}>Send</button>
                </form>
                <div className="bottom-message-options"></div>
            </div>
        </div>  
    ) 
}

export default WorkspacePrimaryView;