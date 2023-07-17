import { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/session";
import { getAllChannels } from "../../../store/channels";
import { getUserWorkspaces } from "../../../store/userWorkspaces";
import { getDirectMessages, removeCurrentWorkspace } from "../../../store/directMessages";
import { fetchCurrentWorkspace } from "../../../store/currentWorkspace";
import { getMessages } from "../../../store/messages";
import WorkspaceNavBar from "../WorkspaceNavBar";
import WorkspaceSidebar from "../WorkspaceSidebar";
import MessagesPane from "./MessagesPane";
import '../Workspace.css'

const WorkspacePrimaryView = () => {
    const dispatch = useDispatch();
    const userWorkspaces = useSelector(getUserWorkspaces);
    const haveData = useSelector(state => state.currentWorkspace.currentWorkspaceId !== undefined)
    const user = useSelector(state => state.session.user);
    const {workspaceId} = useParams();
    const workspace = useSelector(state => state.userWorkspaces[workspaceId])
    const channels = useSelector(getAllChannels);
    const messages = useSelector(getMessages);
    const channelsSubs = useSelector(state => state.currentWorkspace.subscribedChannels)
    const { messageableCode } = useParams();

    useEffect(() => {
        if (userWorkspaces.length === 0 || !workspace.name) {
            dispatch(fetchUser(user.id));
            dispatch(fetchCurrentWorkspace(workspaceId))
        }
    }, [])

    useEffect(() => {
        if (channels.length === 0 && channelsSubs) {
            dispatch(fetchCurrentWorkspace(workspaceId))
        }
    }, [])


    if (!user) return <Redirect to='/' />;
    
    return haveData ? (
        <div id="workspace-layout">
            <WorkspaceNavBar />
            {haveData && <WorkspaceSidebar />}
            {messageableCode && haveData ? <MessagesPane workspaceId={workspaceId}/> : 
                <h1 className="workspace-primary-view h1-only">
                    Please select a channel or direct message.
                    <br></br>
                    Happy Slaquing!
                </h1>}
        </div>
    ) : null
}

export default WorkspacePrimaryView;