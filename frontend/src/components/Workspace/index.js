import { useEffect } from "react";
import { useParams, Redirect, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import WorkspaceNavBar from "./WorkspaceNavBar";
import { fetchUser } from "../../store/session";
import { getUserWorkspaces } from "../../store/workspaceUserSubscriptions";
import { fetchWorkspaceUsers, getWorkspaceUsers } from "../../store/workspaceUsers";
import './Workspace.css'
import WorkspaceSidebar from "./WorkspaceSidebar";
import { getChannels } from "../../store/channels";
import WorkspacePrimaryView from "./WorkspacePrimaryView";

const Workspace = () => {
    const dispatch = useDispatch();
    const userWorkspaces = useSelector(getUserWorkspaces);
    const user = useSelector(state => state.session.user);
    const workspaceUsers = useSelector(getWorkspaceUsers)
    const {workspaceId} = useParams();
    const workspace = useSelector(state => state.userWorkspaces[workspaceId])
    const channels = useSelector(getChannels);
    const { messageableId } = useParams();
    
    useEffect(() => {
        if (userWorkspaces.length === 0 || !workspace.name) {
            dispatch(fetchUser(user.id));
            dispatch(fetchWorkspaceUsers(workspaceId))
        }
    }, [])

    useEffect(() => {
        if (channels.length === 0) {
            dispatch(fetchWorkspaceUsers(workspaceId))
        }
    }, [])

    if (!user) return <Redirect to='/' />;
    
    // const workspaceUsers = useSelector(getWorkspaceUsers);
    return userWorkspaces.length ? (
        <div id="workspace-layout">
            <WorkspaceNavBar />
            <WorkspaceSidebar />
            {messageableId ? <WorkspacePrimaryView /> : 
                <h1 className="workspace-primary-view h1-only">
                    Please select a channel or direct message.
                    <br></br>
                    Happy Slaquing!
                </h1>}
            
        </div>
    ) : null
}

export default Workspace;