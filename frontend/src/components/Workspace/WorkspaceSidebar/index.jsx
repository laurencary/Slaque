import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getChannels } from "../../../store/channels";
import './WorkspaceSidebar.css'
import { HiOutlineHashtag } from "react-icons/hi";
import MessageableItem from "./MessageableItem";
import { getDirectMessages } from "../../../store/directMessages";
import { NavLink } from "react-router-dom";

const WorkspaceSidebar = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const workspace = useSelector(state => state.userWorkspaces[workspaceId]);
    const channels = useSelector(getChannels);
    const directMessages = useSelector(getDirectMessages);
    const user = useSelector(state => state.session.user);
    const [showChannels, setShowChannels] = useState(true);
    const [showDirectMessages, setShowDirectMessages] = useState(true);
    const [selected, setSelected] = useState('')

    return (
        <div className="workspace-sidebar">
            <header className="sidebar-header">
                <div className="sidebar-team-menu">
                    <span className="sidebar-team-name">{workspace.name}</span>
                    <span className="sidebar-team-menu-icon">
                        <svg viewBox="0 0 20 20" >
                            <path fill="currentColor" d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06Z"></path>
                        </svg>
                    </span>
                </div>
            </header>
            <div id="sidebar-list">
                <MessageableItem messageableType={"Channels"} />
                {channels.map((channel) => (
                    <div key={channel.id} className="sidebar-list-item-container">
                        <NavLink to={`/client/${user.id}/${workspace.id}/c${channel.id}`}>
                            <div className="sidebar-list-item">
                                <div className="sidebar-channel-icon">
                                    <HiOutlineHashtag className={ channel.unreadMessages ? "bold" : ""} />
                                </div>
                                <div className={channel.unreadMessages ? "bold" : "" }>{channel.name}</div>
                            </div>
                        </NavLink>
                    </div>
                ))}
                <MessageableItem messageableType={"Direct messages"}/>
                {directMessages.map((directMessage) => (
                    <div key={directMessage.id} className="sidebar-list-item-container">
                        <NavLink to={`/client/${user.id}/${workspace.id}/dm${directMessage.id}`}>
                            <div className="sidebar-direct-message">
                                <div className="sidebar-list-item">
                                    <div className="sidebar-direct-message-icon"></div>
                                    <div className={directMessage.unreadMessageCount > 0 ? "bold dm-name" : "dm-name"}>{directMessage.name}</div>
                                </div>
                                <div className="sidebar-unread-count">
                                    <p>{directMessage.unreadMessageCount > 0 ? directMessage.unreadMessageCount : ''}</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WorkspaceSidebar;