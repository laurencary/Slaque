import { useEffect, useState } from "react";
import { useParams, Redirect, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import WorkspaceNavBar from "./WorkspaceNavBar";
import { fetchUser } from "../../store/session";
import { getUserWorkspaces } from "../../store/userWorkspaces";
import { fetchCurrentWorkspace } from "../../store/currentWorkspace";
import './Workspace.css'
import WorkspaceSidebar from "./WorkspaceSidebar";
import { getAllChannels } from "../../store/channels";
import WorkspaceMessagesView from "./WorkspaceMessagesView";
import { getDirectMessages, removeCurrentWorkspace } from "../../store/directMessages";
import NewDirectMessage from "./NewDirectMessage";

const Workspace = () => {
    const dispatch = useDispatch();
    const userWorkspaces = useSelector(getUserWorkspaces);
    const user = useSelector(state => state.session.user);
    const {workspaceId} = useParams();
    const workspace = useSelector(state => state.userWorkspaces[workspaceId])
    const channels = useSelector(getAllChannels);
    const directMessages = useSelector(getDirectMessages);
    const { messageableCode } = useParams();
    const [showNewMessage, setShowNewMessage] = useState(false)
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
    }, [])

    useEffect(() => {
        dispatch(removeCurrentWorkspace())
        dispatch(fetchCurrentWorkspace(workspaceId))
    }, [workspaceId])

    if (!user) return <Redirect to='/' />;
    
    return userWorkspaces.length ? (
        <div id="workspace-layout">
            <WorkspaceNavBar />
            <WorkspaceSidebar/>
            {/* <Route path="/client/:clientId/:workspaceId/create-direct-message">
                <WorkspaceNavBar />
                <WorkspaceSidebar />
                <NewDirectMessage />
            </Route> */}
            {true && <NewDirectMessage />}
            {/* {messageableCode && channels.length > 0 && directMessages.length > 0 ? <WorkspaceMessagesView workspaceId={workspaceId}/> : 
                <h1 className="workspace-primary-view h1-only">
                    Please select a channel or direct message.
                    <br></br>
                    Happy Slaquing!
                </h1>} */}
        </div>
    ) : null
}

export default Workspace;