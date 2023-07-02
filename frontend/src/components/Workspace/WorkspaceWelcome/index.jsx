import { useEffect } from "react";
import { useParams, Redirect} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/session";
import { getAllChannels } from "../../../store/channels";
import { getUserWorkspaces } from "../../../store/userWorkspaces";
import { removeCurrentWorkspace } from "../../../store/directMessages";
import { fetchCurrentWorkspace } from "../../../store/currentWorkspace";
import WorkspaceNavBar from "../WorkspaceNavBar";
import WorkspaceSidebar from "../WorkspaceSidebar";
import '../Workspace.css'

const WorkspaceWelcome = () => {
    const dispatch = useDispatch();
    const userWorkspaces = useSelector(getUserWorkspaces);
    const user = useSelector(state => state.session.user);
    const { workspaceId } = useParams();
    const workspace = useSelector(state => state.userWorkspaces[workspaceId])
    const channels = useSelector(getAllChannels);

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

    useEffect(() => {
        dispatch(removeCurrentWorkspace())
        dispatch(fetchCurrentWorkspace(workspaceId))
    }, [workspaceId, dispatch])

    if (!user) return <Redirect to='/' />;

    return userWorkspaces.length ? (
        <div id="workspace-layout">
            <WorkspaceNavBar />
            <WorkspaceSidebar />
            <h1 className="workspace-primary-view h1-only">
                Please select a channel or direct message.
                <br></br>
                Happy Slaquing!
            </h1>
        </div>
    ) : null
}

export default WorkspaceWelcome;