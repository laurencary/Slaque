import { useSelector } from "react-redux";
import UserIcon from "../../../../../UserIcon";

const MemberListItem = ({member}) => {
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    return (
        <div className="member-list-item-container">
            <div className="member-list-item">
                <div className="message-author-photo img-placeholder">
                    <UserIcon wusId={member.id} size="medium" />
                </div>
                <div className="member-details">
                    <div className="member-names">
                        <h1>{member.fullName}{member.id=== workspaceUserId ? " (you)" : ""}</h1>
                        <h2>{member.displayName}</h2>
                    </div>
                    <div className="member-title">
                        <h3>{member.title}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberListItem;