import { useSelector } from "react-redux";

const DirectMessageTopDetails = ({ messageMembersArr, messageableId }) => {
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
            <div className="message-details-user-photos">
                {messageMembersArr.filter(id => id !== currentWorkspaceUserId).map((workspaceUserId) => (
                    <div key={`i${workspaceUserId}dm${messageableId}`} className="img-placeholder"></div>
                ))}
            </div>
            <div className="message-details-text-container">
                <span>This is the very beginning of your direct message history with </span>
                {messageMembersArr.filter(id => id !== currentWorkspaceUserId).map((workspaceUserId, index) => (
                    <span key={`s${workspaceUserId}dm${messageableId}`}>
                        {workspaceUsers[workspaceUserId].fullName}
                        {calcSeparator(index)}
                    </span>
                ))}
            </div>
        </>
    )
}

export default DirectMessageTopDetails;