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

    const [messageContent, setMessageContent] = useState('');
 
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
        let unreadByWorkspaceUsers = {};
        for (const id of messageMembersArr) {
            if (id !== clientId * 1) {
                unreadByWorkspaceUsers[id] = true
            }
        }
        setMessageContent('')

        const newMessage = {
            workspaceAuthorId: clientId,
            content: messageContent,
            edited: false,
            unreadByWorkspaceUsers,
            messageableId,
            messageableType: messageableType === "channel" ? "Channel" : "DirectMessage"
        }
        dispatch(createMessage(newMessage));
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
            <div className="message-scroll-container">
                <div className="messageable-details">
                    {messageableType === 'channel' ? 
                        <ChannelTopDetails messageableId={messageableId}/> : 
                        <DirectMessageTopDetails messageMembersArr={messageMembersArr}/>
                    }
                </div>
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
                <div className="create-message-footer">
                    <div className="create-message-container">
                        <div className="top-message-options"><strong>B</strong> I</div>
                        <div className="content-editable-container">
                            {/* <p className="create-message-content" contentEditable="true">{messageableType === "channel" ? "Message #" + messageName : "Message " + messageName.join(", ")}</p> */}
                            <form onSubmit={handleSubmit}>
                                <textarea className="message-textarea"
                                    placeholder={messageableType === "channel" ? "Message #" + messageName : "Message " + messageName.join(", ")}
                                    value={messageContent}
                                    onChange={(e) => setMessageContent(e.target.value)}>
                                </textarea>
                            </form>
                        </div>
                        <div className="bottom-message-options">
                            <div className="bottom-left-options">@</div>
                            <div className="bottom-right-options">
                                <div className="bottom-buttons-container">
                                    <span>
                                        <button onClick={handleSubmit} className="create-message-send-button" disabled={messageContent === "" || messageContent.includes(messageName)}>
                                            <svg viewBox="0 0 20 20" className="create-message-send-icon">
                                                <path fill="currentColor" d="M1.5 2.25a.755.755 0 0 1 1-.71l15.596 7.807a.73.73 0 0 1 0 1.306L2.5 18.46l-.076.018a.749.749 0 0 1-.924-.728v-4.54c0-1.21.97-2.229 2.21-2.25l6.54-.17c.27-.01.75-.24.75-.79s-.5-.79-.75-.79l-6.54-.17A2.253 2.253 0 0 1 1.5 6.789v-4.54Z"></path>
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="notifications-footer"></div>
                </div>
            </div>
        </div>  
    ) 
}

export default WorkspacePrimaryView;