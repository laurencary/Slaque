import { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/session";
import { getAllChannels } from "../../../store/channels";
import { getUserWorkspaces } from "../../../store/userWorkspaces";
import { fetchCurrentWorkspace } from "../../../store/currentWorkspace";
import WorkspaceNavBar from "../WorkspaceNavBar"
import WorkspaceSidebar from "../WorkspaceSidebar"
import ChannelItem from "./ChannelItem";
import './ChannelIndex.css'

const ChannelsIndex = () => {
    const dispatch = useDispatch();
    const userWorkspaces = useSelector(getUserWorkspaces);
    const user = useSelector(state => state.session.user);
    const { workspaceId } = useParams();
    const workspace = useSelector(state => state.userWorkspaces[workspaceId])
    const channels = useSelector(getAllChannels);
    const subscribedChannelsArr = useSelector(state => state.currentWorkspace.subscribedChannels)

    useEffect(() => {
        if (userWorkspaces.length === 0 || !workspace.name) {
            dispatch(fetchUser(user.id));
            dispatch(fetchCurrentWorkspace(workspaceId))
        }
    }, [])

    useEffect(() => {
        if (channels.length === 0) {
            dispatch(fetchCurrentWorkspace(workspaceId))
        }
    }, [dispatch, workspaceId])


    if (!user) return <Redirect to='/' />;

    return userWorkspaces.length ? (
        <div id="workspace-layout">
            <WorkspaceNavBar />
            <WorkspaceSidebar />
            <div className="workspace-primary-view">
                <div className="primary-header-container">
                    <header className="primary-header-name">All Channels</header>
                </div>
                <div className="channels-browse-controls">{channels.length} channel{channels.length === 1 ? '' : 's'}</div>
                {channels.map((channel) => (
                    <ChannelItem key={`ci${channel.id}`} 
                    channel={channel} 
                    isSubscribed={subscribedChannelsArr.includes(channel.id)}/>
                ))}
            </div>
        </div>
    ) : null
}

export default ChannelsIndex