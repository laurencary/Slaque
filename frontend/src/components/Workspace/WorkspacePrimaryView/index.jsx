import { useEffect } from "react";
import { useParams } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, getMessages } from "../../../store/messages";
import { HiOutlineHashtag } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import './WorkspacePrimaryView.css'
import DirectMessageTopDetails from "./DirectMessageTopDetails";


const WorkspacePrimaryView = () => {
    let { messageableId } = useParams();
    const dispatch = useDispatch();
    const messageableType = messageableId.includes("c") ? "channel" : "directMessage";
    const messages = useSelector(getMessages);
    const messageName = useSelector(state => {
        if (messageableType === "channel") {
            return state.channels[messageableId.slice(1,100) * 1].name
        } else {
            const userNameArr = state.directMessages[messageableId.slice(2, 100) * 1].name
            let name;
            if (userNameArr.length < 4) {
                name = userNameArr.join(', ');
                return name
            } else {
                const name = userNameArr.slice(0, 2).join(', ')
                name = name + ', ' + (userNameArr.length - 2).toString() + ' others'
                return name
            }
        }
    })

    
    const messageMembersArr = useSelector(state => {
        if (messageableType === "channel") {
            return state.channels[messageableId.slice(1, 100) * 1].workspaceUsers
        } else {
            return state.directMessages[messageableId.slice(2, 100) * 1].workspaceUsers
        }
    })
    
    useEffect(() => {
        dispatch(fetchMessages(messageableId, messageableType));
    }, [messageableId])

    useEffect(() => {
        dispatch(fetchMessages(messageableId, messageableType));
    }, [])


    return (
        <div className="workspace-primary-view">
            <div className="primary-header-container">
                <header className="primary-header-name">
                    { messageableType === "channel" ? <HiOutlineHashtag /> : <></> }
                    {messageName}
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
                    '' : 
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
                {/* <form>
                    <textarea placeholder={ 'Message ' + messageName }></textarea>
                    <button>{MdSend}</button>
                </form> */}
            </div>
        </div>  
    )
}

export default WorkspacePrimaryView;