import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../../store/session';

const ProfileButton = () => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    
    return (
        <div onClick={() => setShowMenu(!showMenu)}>
            <i style={{ color: "navy", backgroundColor: "white", fontSize: "40px" }} className="fa-solid fa-user"></i>
            <ul className={showMenu ? "profile-button-menu" : "hidden"}>
                <h1>Full Name</h1>
                <hr className="profile-menu-hr"></hr>
                <li className="profile-menu-li">Profile</li>
                <hr className="profile-menu-hr"></hr>
                <li className="profile-menu-li" onClick={() => dispatch(sessionActions.logout())}>
                    Sign out of App Academy</li>
            </ul>
        </div>
    )
}

export default ProfileButton;