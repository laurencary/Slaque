import { useDispatch, useSelector } from "react-redux";
import { fetchUserWorkspaces, getUserWorkspaces } from "../../store/workspaceUserSubscriptions";
import { useEffect } from "react";
import NavBar from "../NavBar";
import wave from '../../images/waving-hand@2x.gif'
import WorkspaceItem from "./WorkspaceItem";
import './Welcome.css'

const Welcome = () => {
    const dispatch = useDispatch();
    const userWorkspaces = useSelector(getUserWorkspaces);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchUserWorkspaces());
    }, [dispatch])

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

