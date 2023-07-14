import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserWorkspaces } from "../../store/userWorkspaces";
import { getOtherWorkspaces } from "../../store/otherWorkspaces";
import { removeCurrentWorkspace } from "../../store/currentWorkspace";
import { fetchUser } from "../../store/session";
import wave from '../../images/waving-hand@2x.gif'
import WorkspaceItem from "./WorkspaceItem";
import NavBar from "../NavBar";
import './Welcome.css'

const Welcome = () => {
    const dispatch = useDispatch();
    const userWorkspaces = useSelector(getUserWorkspaces);
    const otherWorkspaces = useSelector(getOtherWorkspaces);
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
                            <WorkspaceItem key={`w${userWorkspace.id}`} 
                                workspace={userWorkspace} 
                                isMember={true}/>
                        ))}
                        {otherWorkspaces.map((otherWorkspace) => (
                            <WorkspaceItem key={`w${otherWorkspace.id}`} 
                                workspace={otherWorkspace} 
                                isMember={false}/>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Welcome;

