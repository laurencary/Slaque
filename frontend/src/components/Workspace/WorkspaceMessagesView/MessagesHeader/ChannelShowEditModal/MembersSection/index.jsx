import { useSelector } from "react-redux";
import { FiUserPlus } from "react-icons/fi";
import MemberListItem from "./MemberListItem";
import './MembersSection.css'

const MembersSection = ({messageable}) => {
    const workspaceUsers = useSelector(state => state.workspaceUsers)

    return (
        <div>
            <div className="member-list-item-container">
                <button className="add-people-button member-list-item unstyled-button">
                    <div id="add-people-icon-container">
                        <span id="add-members-icon"><FiUserPlus size='2x'/></span>
                    </div>
                    <div className="member-details">
                        <div className="member-names">
                            <h1>Add People</h1>
                        </div>
                    </div>
                </button>
            </div>
            {messageable.workspaceUsers.map((memberId) => (
                <MemberListItem key={`mm${memberId}`}
                    member={workspaceUsers[memberId]}
                />
            ))}
        </div>
        
    )
}

export default MembersSection;