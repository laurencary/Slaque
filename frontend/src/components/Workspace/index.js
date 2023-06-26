import { useEffect } from "react";
import { useParams, Redirect, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import WorkspaceNavBar from "./WorkspaceNavBar";
import { fetchUser } from "../../store/session";
import { getUserWorkspaces } from "../../store/userWorkspaces";
import { fetchCurrentWorkspace } from "../../store/currentWorkspace";
import './Workspace.css'
import WorkspaceSidebar from "./WorkspaceSidebar";
import { getChannels } from "../../store/channels";
import WorkspacePrimaryView from "./WorkspacePrimaryView";
import { getDirectMessages } from "../../store/directMessages";

const Workspace = () => {
    const dispatch = useDispatch();
    const userWorkspaces = useSelector(getUserWorkspaces);
    const user = useSelector(state => state.session.user);
    const {workspaceId} = useParams();
    const workspace = useSelector(state => state.userWorkspaces[workspaceId])
    const channels = useSelector(getChannels);
    const directMessages = useSelector(getDirectMessages);
    const { messageableCode } = useParams();
    
    useEffect(() => {
        if (userWorkspaces.length === 0 || !workspace.name) {
            dispatch(fetchUser(user.id));
            dispatch(fetchCurrentWorkspace(workspaceId))
            // const subscription = consumer.subscriptions.create(
            //     { channel: 'ChannelsChannel', id: workspaceId }
            // );

            // return () => subscription?.unsubscribe();
        }
    }, [])

    useEffect(() => {
        if (channels.length === 0) {
            // dispatch(fetchCurrentWorkspace(workspaceId))
            // const subscription = consumer.subscriptions.create(
            //     { channel: 'ChannelsChannel', id: workspaceId }
            // );

            // return () => subscription?.unsubscribe();
        }
    }, [])

    if (!user) return <Redirect to='/' />;
    
    return userWorkspaces.length ? (
        <div id="workspace-layout">
            <WorkspaceNavBar />
            <WorkspaceSidebar />
            {messageableCode && channels.length > 0 && directMessages.length > 0 ? <WorkspacePrimaryView workspaceId={workspaceId}/> : 
                <h1 className="workspace-primary-view h1-only">
                    Please select a channel or direct message.
                    <br></br>
                    Happy Slaquing!
                </h1>}
            
        </div>
    ) : null
}

export default Workspace;