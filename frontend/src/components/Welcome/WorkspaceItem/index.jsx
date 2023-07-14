import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from 'react';
import './WorkspaceItem.css'
import DunderLogo from "./DunderMifflinLogo";
import WickedLogo from "./WickedLogo";
import CreateEditProfile from "../../CreateEditProfile"
import {Modal} from '../../../context/Modal'

const WorkspaceItem = ({ workspace, isMember }) => {
    const user = useSelector(state => state.session.user);
    const [showCreateProfile, setShowCreateProfile] = useState(false);

    return (
        <li className="workspace-item-container">
            <div className="workspace-item-left">
                <div className="welcome-workspace-logo">
                    {workspace.name.startsWith("D") ? <DunderLogo /> : <WickedLogo />}
                </div>
                <div className="workspace-item-details">
                    <h2 className="workspace-item-name">{workspace.name}</h2>
                    {/* <> 5 memberphotos?</> */}
                    <p className="workspace-item-members">{workspace.memberCount} {workspace.memberCount === 1 ? "member" : "members"}</p>
                </div>
            </div>
            <div >
                {isMember ? <NavLink className="workspace-item-right" to={`/client/${user.id}/${workspace.id}`}>LAUNCH SLAQUE</NavLink>
                    : <button className="workspace-item-right" onClick={() => setShowCreateProfile(!showCreateProfile)}>JOIN WORKSPACE</button>}
            </div>
            {showCreateProfile && (
                <Modal onClose={()=>setShowCreateProfile(false)}>
                    <CreateEditProfile
                        setShow={showCreateProfile}
                        profile={{}}
                        closeModals={() => setShowCreateProfile(false)} 
                        isCreate={true}
                        workspaceId={workspace.id}/>
                </Modal>
            )}
        </li>
    )
}

export default WorkspaceItem;

