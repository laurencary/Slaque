import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserWorkspaces } from "../../store/workspaceUserSubscriptions";
import { fetchUser } from "../../store/session";
import NavBar from "../NavBar";
import wave from '../../images/waving-hand@2x.gif'
import WorkspaceItem from "./WorkspaceItem";
import './Welcome.css'
import { removeCurrentWorkspace } from "../../store/currentWorkspace";

const Welcome = () => {
    const dispatch = useDispatch();
    const userWorkspaces = useSelector(getUserWorkspaces);
    const user = useSelector(state => state.session.user);
    
    useEffect(() => {
        if (userWorkspaces.length === 0) {
            dispatch(fetchUser(user.id))
        }
    }, [])

    useEffect(() => {
        dispatch(removeCurrentWorkspace());
    }, [])
    
    if (!user) return <Redirect to='/' />;

    return (
        <>
            <NavBar />
            <div id="welcome-hero">
                <header id="welcome-header"><img id="welcome-wave" src={wave} alt="Welcome wave!"/>Welcome back</header>
                <div id="workspaces-container">
                    <h1 id="workspaces-for">Workspaces for { user === null ? '' : user.email }</h1>
                    <ul id="workspaces-welcome-list">
                        {userWorkspaces.map((userWorkspace) => (
                            <WorkspaceItem key={userWorkspace.id} workspace={userWorkspace} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Welcome;

