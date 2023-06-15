import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SlaqueLogo from "../SlaqueLogo";
import { Link } from "react-router-dom/";

// logged out or logged in w no workspace selected
//logo
//github or nothing
//linkedin or nothing
//signin or signout
//signup or createworkspace

const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const workspace = false;

    let sessionLinksLeft;
    let sessionLinksRight;
    if (sessionUser) {
        if (workspace) {
            // sessionLinksLeft = (
            //     // search bar
            // )
            sessionLinksRight = (
                <div id="nav-left">
                    <ProfileButton />
                </div>
            )
        } else {
            sessionLinksRight = (
                <></>
                // signout
                // create a new workspace
            )
        }
    } else {
        //logged out
        sessionLinksLeft = (
            <div id="nav-left">
                <li className="nav-li"><Link to="https://github.com/laurencary">GitHub</Link></li>
                <li className="nav-li"><Link to="https://www.linkedin.com/in/laurengarmstrong/">LinkedIn</Link></li>
            </div>
        )
    }

    return (
        <ul className="nav-bar">
            <SlaqueLogo />
            {sessionLinksLeft}
            {sessionLinksRight}
        </ul>
    )
}

export default NavBar;