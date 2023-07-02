import { useSelector } from "react-redux";
import { FiUserPlus } from "react-icons/fi";
import MemberListItem from "./MemberListItem";
import './MembersSection.css'
import { useState } from "react";
import AddMemberForm from "./AddMemberForm";

const MembersSection = ({messageable}) => {
    const workspaceUsers = useSelector(state => state.workspaceUsers)
    const [showAddPeople, setShowAddPeople] = useState(false)

    return (
        <div className="member-list-container">
            <div className="member-list-item-container">
                {!showAddPeople && <button 
                    onClick={() => setShowAddPeople(true)}
                    className="add-people-button member-list-item unstyled-button">
                    <div id="add-people-icon-container">
                        <span id="add-members-icon"><FiUserPlus size='2x'/></span>
                    </div>
                    <div className="member-details">
                        <div className="member-names">
                            <h1>Add People</h1>
                        </div>
                    </div>
                </button>}
                {showAddPeople && <div className="messageable-modal-add-member-container">
                    <AddMemberForm 
                        setShow={setShowAddPeople}
                        messageable={messageable}/>
                </div>}
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