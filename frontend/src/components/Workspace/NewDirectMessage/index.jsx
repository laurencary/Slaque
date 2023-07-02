import { useEffect, useState } from "react";
import MessageContentInput from "../WorkspaceMessagesView/MessagesView/MessageContentInput";
import { useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import './NewDirectMessage.css'

const NewDirectMessage = () => {
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const [messageMembersArr, updateMessageMembersArr] = useState([workspaceUserId])
    const workspaceUsers = useSelector(state => state.workspaceUsers)
    const workspaceUsersArr = useSelector(state => Object.values(state.workspaceUsers))
    const [searchVal, setSearchVal] = useState('');
    const [searchResults, setSearchResults] = useState();


    const handleRemoveItem = (id) => {
        updateMessageMembersArr(messageMembersArr.filter(userId => userId !== id));
    }

    const handleAddItem = (id) => {
        setSearchVal('')
        if (id) updateMessageMembersArr([...messageMembersArr, id]);
    }

    useEffect(() => {
        const filtered = workspaceUsersArr.filter((user) => (!messageMembersArr.includes(user.id) && (user.fullName.includes(searchVal) || (user.displayName && user.displayName.includes(searchVal)))))
        setSearchResults(filtered.length === 0 ? [{ fullName: "No items" }] : filtered)
    }, [searchVal])

    return (
        <div className="workspace-primary-view">
            <div className = "primary-header-container">
                <header className="primary-header-name">New Message</header>
            </div>
            <div className="composer-subheader-container">
                <div className="composer-subheader">
                    <span className="composer-subheader-prefix">To:</span>
                    {messageMembersArr.filter(id => id !== workspaceUserId).map((userId) => (
                        <span key={`ub${userId}`}
                            className="unstyled-button new-dm-recipient-button">
                            <span className="new-dm-recipient-name">{workspaceUsers[userId].fullName}</span>
                            <span onClick={() => handleRemoveItem(userId)}><FiX /></span>
                        </span>
                    ))}
                    <div>
                        <input type="text" 
                            className="search-user-input"
                            value={searchVal} 
                            placeholder="start typing a name..."
                            onChange={(e) => setSearchVal(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className={searchVal ? "search-user-results" : ""}>
                {searchVal && searchResults.map((user) => (
                    <div key={`user${user.id}`}
                        onClick={() => handleAddItem(user.id)} 
                        className={user.fullName === "No items" ? "no-search-result" : "search-result-user"}>
                        <strong>{user.fullName}</strong>
                        <span className="search-result-user-display">{user.displayName && (user.displayName)}</span>
                        <span className="search-result-user-title">{user.title && (`(${user.title})`)}</span>
                    </div>
                ))}
            </div>
            <div className="create-message-footer">
                <MessageContentInput messageableId={''}
                    messageableType={'directMessage'}
                    messageMembersArr={messageMembersArr}
                    defaultVal={"Start a new message"}
                    content={''}
                    isCreate={true}
                    message={{}}
                    setShowEditContent={{}} />
            </div>
        </div>
    )
}
export default NewDirectMessage;

// .filter((user) => user.fullName.includes(searchVal) || user.displayName.includes(searchVal))