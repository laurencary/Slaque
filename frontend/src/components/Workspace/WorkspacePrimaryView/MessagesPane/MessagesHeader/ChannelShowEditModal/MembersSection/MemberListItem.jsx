import { useSelector } from "react-redux";

const MemberListItem = ({member}) => {
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    return (
        <div className="member-list-item-container">
            <div className="member-list-item">
                <div className="img-placeholder-small"></div>
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