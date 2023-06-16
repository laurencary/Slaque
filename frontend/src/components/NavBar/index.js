import { useEffect, Redirect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SlaqueLogo from "../SlaqueLogo";
import * as sessionActions from '../../store/session';
import './NavBar.css'
import DemoButton from "../DemoButton";

const NavBar = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const workspace = false;
    // console.log(sessionUser);
    let sessionLinksLeft;
    let sessionLinksRight;

    useEffect(() => {
        document.body.classList.remove('white')
        document.body.classList.add('purple')
    },[])

    if (!sessionUser) {
        sessionLinksRight = (
            <div id="nav-left">
                <></>
                <li className="nav-li"><NavLink to="/signin" className="link-text signin">Sign In</NavLink></li>
                <DemoButton classNm="button-purple signin" />
                <NavLink to="/get-started/createnew" className="link-text button-white extra">SIGN UP</NavLink>
            </div>
        ) 
    } else {
        sessionLinksRight = (
            <div id="nav-right">
                <Link to="/" onClick={() => dispatch(sessionActions.logout())} className="link-text button-purple">SIGN OUT</Link>
                <NavLink to="" className="link-text button-white">CREATE A NEW WORKSPACE</NavLink>
            </div>
        )
    }
    

    if (workspace) {
        sessionLinksLeft = (
            // search bar
            <></>
        )  
        sessionLinksRight = (
            <div id="nav-left">
                <ProfileButton />
            </div>
        ) 
    } else {
        //logged out
        sessionLinksLeft = (
            <div id="nav-left">
                <li className="nav-li"><Link to="https://github.com/laurencary" className="link-text">GitHub</Link></li>
                <li className="nav-li"><Link to="https://www.linkedin.com/in/laurengarmstrong/" className="link-text">LinkedIn</Link></li>
            </div>
        )
    }

    return (
        <ul className="nav-bar">
            <SlaqueLogo isColorful={false}/>
            <div id="nav-li-container">
                {sessionLinksLeft}
                {sessionLinksRight}
            </div>
        </ul>
    )
}

export default NavBar;