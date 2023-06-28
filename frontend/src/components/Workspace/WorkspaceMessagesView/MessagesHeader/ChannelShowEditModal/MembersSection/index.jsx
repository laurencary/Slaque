import { useSelector } from "react-redux";
import { FiUserPlus } from "react-icons/fi";
import MemberListItem from "./MemberListItem";
import './MembersSection.css'

const MembersSection = ({channel}) => {
    const workspaceUsers = useSelector(state => state.workspaceUsers)

    return (
        <div>
            <button><span><FiUserPlus /></span>Add People</button>
            {channel.workspaceUsers.map((memberId) => (
                <MemberListItem key={`mm${memberId}`}
                    member={workspaceUsers[memberId]}
                />
            ))}
        </div>
    )
}

export default MembersSection;