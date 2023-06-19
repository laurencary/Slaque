import { NavLink } from "react-router-dom";
import './WorkspaceItem.css'

const WorkspaceItem = ({workspace}) => {
    return (
        <li className="workspace-item-container">
            <div className="workspace-item-left">
                <div className="img-placeholder"></div>
                <div className="workspace-item-details">
                    <h2 className="workspace-item-name">{workspace.name}</h2>
                    {/* <>memberphotos?</> */}
                    <p className="workspace-item-members">{workspace.memberCount} {workspace.memberCount > 1 ? "members" : "member"}</p>
                </div>
            </div>
            <div >
                <NavLink className="workspace-item-right" to="">LAUNCH SLACK</NavLink>
            </div>
        </li>
    )
}

export default WorkspaceItem;