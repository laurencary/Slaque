import { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceUsers } from "../../store/workspaceUsers";
import WorkspaceNavBar from "./WorkspaceNavBar";
import { fetchUser } from "../../store/session";
import { getUserWorkspaces } from "../../store/workspaceUserSubscriptions";
import './Workspace.css'

const Workspace = () => {
    const dispatch = useDispatch();
    const userWorkspaces = useSelector(getUserWorkspaces);
    const user = useSelector(state => state.session.user);
    const {workspaceId} = useParams();
    const workspace = useSelector(state => state.userWorkspaces[workspaceId])
    
    useEffect(() => {
        if (userWorkspaces.length === 0 || !workspace.name) {
            dispatch(fetchUser(user.id));
        }
    }, [])

    if (!user) return <Redirect to='/' />;
    
    // const workspaceUsers = useSelector(getWorkspaceUsers);
    return userWorkspaces.length ? (
        <div id="workspace-layout">
            <WorkspaceNavBar />
            <div className="workspace-sidebar">
                <header className="sidebar-header">
                    <button className="sidebar-team-menu">
                        <span className="sidebar-team-name">{workspace.name}</span>
                        <span className="sidebar-team-menu-icon">
                            <svg viewBox="0 0 20 20" >
                                <path fill="currentColor" d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06Z"></path>
                            </svg>
                        </span>
                    </button>
                </header>
            </div>
            <div className="workspace-primary-view"></div>
        </div>
    ) : null
}

export default Workspace;