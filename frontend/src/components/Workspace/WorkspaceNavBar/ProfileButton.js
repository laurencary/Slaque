import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../../store/session';
import { getCurrentWorkspaceProfile } from "../../../store/currentWorkspace";
import { Modal } from "../../../context/Modal";
import UserIcon from "../UserIcon";
import CreateEditProfile from "../../CreateEditProfile";

const ProfileButton = () => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const profile = useSelector(getCurrentWorkspaceProfile);
    const closeModals = () => {
        setShowMenu(false);
        setShowProfile(false)
    }

    const conditionalClose = () => {
        if (!showProfile) setShowMenu(false);
    }
    return profile ? (
        <div>
            <div className="profile-button" onClick={() => setShowMenu(!showMenu)}>
                <UserIcon wusId={profile.id} size="small"/>
            </div>
            {/* <i onClick={() => setShowMenu(!showMenu)}  style={{ color: "navy", backgroundColor: "white", fontSize: "40px" }} className="fa-solid fa-user"></i> */}
            <ul className={showMenu ? "profile-button-menu" : "hidden"} onMouseLeave={conditionalClose}>
                <header className="profile-dropdown-header">
                    <div className="message-author-photo img-placeholder">
                        <UserIcon wusId={profile.id} size="medium" />
                    </div>
                    <h1>{profile.fullName}</h1>
                </header>
                <hr className="profile-menu-hr"></hr>
                <li onClick={() => setShowProfile(true)} className="profile-menu-li">Edit Profile</li>
                <hr className="profile-menu-hr"></hr>
                <li className="profile-menu-li" onClick={() => dispatch(sessionActions.logout())}>
                    Sign out of Slaque</li>
            </ul>
            {showProfile && (
                <Modal onClose={closeModals}>
                    <CreateEditProfile
                        setShow={setShowProfile}
                        profile={profile}
                        closeModals={closeModals}/>
                </Modal>
            )}
        </div>
    ) : null
}

export default ProfileButton;