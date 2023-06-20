import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../../store/session';
import { getCurrentWorkspaceProfile } from "../../../store/currentWorkspace";

const ProfileButton = () => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const profile = useSelector(getCurrentWorkspaceProfile);
    console.log(profile);

    return profile ? (
        <div onClick={() => setShowMenu(!showMenu)}>
            <i style={{ color: "navy", backgroundColor: "white", fontSize: "40px" }} className="fa-solid fa-user"></i>
            <ul className={showMenu ? "profile-button-menu" : "hidden"}>
                <h1>{profile.fullName}</h1>
                <hr className="profile-menu-hr"></hr>
                <li className="profile-menu-li">Profile</li>
                <hr className="profile-menu-hr"></hr>
                <li className="profile-menu-li" onClick={() => dispatch(sessionActions.logout())}>
                    Sign out of App Academy</li>
            </ul>
        </div>
    ) : null
}

export default ProfileButton;