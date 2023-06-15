import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom/";
import ProfileButton from "./ProfileButton";
import SlaqueLogo from "../SlaqueLogo";
import * as sessionActions from '../../store/session';

import './NavBar.css'
import DemoButton from "../DemoButton";
import { useEffect } from "react";

// logged out or logged in w no workspace selected
//logo
//github or nothing
//linkedin or nothing
//signin or signout
//signup or createworkspace

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
                <DemoButton/>
                //signin 
                //sign up
            </div>
        ) 
    } else {
        sessionLinksRight = (
            <div id="nav-right">
                <li className="nav-li" ><div onClick={() => dispatch(sessionActions.logout())} className="link-text signout">SIGN OUT</div></li>
                <li className="nav-li" ><NavLink to="" className="link-text create-workspace">CREATE A NEW WORKSPACE</NavLink></li>
            </div>
            // signout
            // create a new workspace
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