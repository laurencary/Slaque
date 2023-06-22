import { useSelector } from "react-redux";

const DirectMessageTopDetails = ({ messageMembersArr }) => {
    const currentWorkspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId);
    const workspaceUsers = useSelector(state => state.workspaceUsers)

    const calcSeparator = (index) => {
        const lastIndex = messageMembersArr.length - 2
        if (lastIndex === 0 || index === lastIndex) {
            return ''
        } else if (lastIndex === 1 && index === 0) {
            return ' and '
        } else {
            return ', '
        }
    }

    return (
        <>
            <div className="message-details-user-photos"></div>
            <div className="message-details-text-container">
                <p>This is the very beginning of your direct message history with </p>
                {messageMembersArr.filter(id => id !== currentWorkspaceUserId).map((workspaceUserId, index) => (
                    <span key={workspaceUserId}>
                        {workspaceUsers[workspaceUserId].fullName}
                        {calcSeparator(index)}
                    </span>
                ))}
            </div>
        </>
    )
}

export default DirectMessageTopDetails;