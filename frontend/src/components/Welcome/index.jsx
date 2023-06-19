import { useSelector } from "react-redux";
import NavBar from "../NavBar";
import './Welcome.css'
import wave from '../../images/waving-hand@2x.gif'

const Welcome = () => {
    const user = useSelector(state => state.session.user);
    

    // if (!user) return (<Redirect to="/" />);

    return (
        <>
            <NavBar />
            <div id="welcome-hero">
                <header id="welcome-header"><img id="welcome-wave" src={wave} alt="Welcome wave!"/>Welcome back</header>
                <div id="workspaces-container">
                    <p>Workspaces for { user === null ? '' : user.email }</p>
                    <ul id="workspaces-welcome-list">
                        <li>App Academy</li>
                        <li>Bay Area Ultimate</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Welcome;

