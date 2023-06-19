import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import './WorkspaceItem.css'

const WorkspaceItem = ({workspace}) => {
    const user = useSelector(state => state.session.user);

    return (
        <li className="workspace-item-container">
            <div className="workspace-item-left">
                <div className="img-placeholder"></div>
                <div className="workspace-item-details">
                    <h2 className="workspace-item-name">{workspace.name}</h2>
                    {/* <> 5 memberphotos?</> */}
                    <p className="workspace-item-members">{workspace.memberCount} {workspace.memberCount === 1 ? "member" : "members"}</p>
                </div>
            </div>
            <div >
                <NavLink className="workspace-item-right" to={`/client/${user.id}/${workspace.id}`}>LAUNCH SLACK</NavLink>
            </div>
        </li>
    )
}

export default WorkspaceItem;