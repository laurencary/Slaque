import { useEffect, useState } from "react";
import MessageContentInput from "../WorkspaceMessagesView/MessagesView/MessageContentInput";
import { useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import './NewDirectMessage.css'

const NewDirectMessage = () => {
    const [messageMembersArr, updateMessageMembersArr] = useState([])
    const workspaceUsers = useSelector(state => state.workspaceUsers)
    const workspaceUsersArr = useSelector(state => Object.values(state.workspaceUsers))
    const [searchVal, setSearchVal] = useState('');

    const handleRemoveItem = (id) => {
        updateMessageMembersArr(messageMembersArr.filter(userId => userId !== id));
    }

    const handleAddItem = (id) => {
        setSearchVal('')
        updateMessageMembersArr([...messageMembersArr, id]);
    }

    return (
        <div className="workspace-primary-view">
            <div className = "primary-header-container">
                <header className="primary-header-name">New Message</header>
            </div>
            <div className="composer-subheader-container">
                <div className="composer-subheader">
                    <span className="composer-subheader-prefix">To:</span>
                    {messageMembersArr.map((userId) => (
                        <span key={`ub${userId}`}
                            className="unstyled-button new-dm-recipient-button">
                            <span>{workspaceUsers[userId].fullName}</span>
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
            <div className="search-user-results">
                {searchVal && workspaceUsersArr.filter((user) => (!messageMembersArr.includes(user.id) && (user.fullName.includes(searchVal) || (user.displayName && user.displayName.includes(searchVal))))).map((user) => (
                    <div key={`user${user.id}`}
                        onClick={() => handleAddItem(user.id)} 
                        className="search-result-user">
                        {user.fullName} - {user.displayName}
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