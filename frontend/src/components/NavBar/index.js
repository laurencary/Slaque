import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import SlaqueLogo from "../SlaqueLogo";
import * as sessionActions from '../../store/session';
import DemoButton from "../DemoButton";
import './NavBar.css'

const NavBar = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
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
                {/* <NavLink to="" className="link-text button-white">CREATE A NEW WORKSPACE</NavLink> */}
            </div>
        )
    }

    const sessionLinksLeft = (
        <div id="nav-left">
            <li className="nav-li"><Link to={{pathname: "https://github.com/laurencary" }}target="_blank" className="link-text">GitHub</Link></li>
            <li className="nav-li"><Link to={{ pathname: "https://www.linkedin.com/in/laurengcary/"}} target="_blank" className="link-text">LinkedIn</Link></li>
            <li className="nav-li"><Link to={{ pathname: "https://laurencary.github.io/portfolio/"}} target="_blank" className="link-text">Portfolio</Link></li>
        </div>
    )

    return (
        <ul className="nav-bar">
            <SlaqueLogo isColorful={false} color="white"/>
            <div id="nav-li-container">
                {sessionLinksLeft}
                {sessionLinksRight}
            </div>
        </ul>
    )
}

export default NavBar;