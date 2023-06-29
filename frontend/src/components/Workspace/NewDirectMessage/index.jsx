import { useEffect, useState } from "react";
import MessageContentInput from "../WorkspaceMessagesView/MessagesView/MessageContentInput";
import { useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import './NewDirectMessage.css'

const NewDirectMessage = () => {
    const [messageMembersArr, setMessageMembersArr] = useState([])
    const workspaceUsers = useSelector(state => state.workspaceUsers)
    const workspaceUsersArr = useSelector(state => Object.values(state.workspaceUsers))
    const [searchVal, setSearchVal] = useState('');

    const handleRemoveItem = (e) => {
        const id = e.target.getAttribute("id");
        setMessageMembersArr(list.filter(userId => userId !== id));
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
                        <button key={`ub${userId}`}
                            className="unstyled-button new-dm-recipient-button">
                            <span>{workspaceUsers[userId].fullName}</span>
                            <span userId={userId} onClick={handleRemoveItem}><FiX /></span>
                        </button>
                    ))}
                    <div>
                        <input type="text" 
                            value={searchVal} 
                            placeholder="start typing a name..."
                            onChange={(e) => setSearchVal(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="search-user-results">
                {workspaceUsersArr.filter((user) => (!messageMembersArr.includes(user.id) && (user.fullName.includes(searchVal) || (user.displayName && user.displayName.includes(searchVal))))).map((user) => (
                    <div key={`user${user.id}`}
                        onClick={() => setMessageMembersArr([...messageMembersArr, user.id])} 
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