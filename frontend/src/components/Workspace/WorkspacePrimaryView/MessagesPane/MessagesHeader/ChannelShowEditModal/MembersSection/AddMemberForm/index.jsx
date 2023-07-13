import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { createChannelSubscription } from "../../../../../../../../store/channelSubscriptions";
import { createDirectMessageSubscription } from "../../../../../../../../store/directMessageSubscriptions";


const AddMemberForm = ({ messageable, setShow }) => {
    const dispatch = useDispatch();
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const [messageMembersArr, updateMessageMembersArr] = useState([])
    const workspaceUsers = useSelector(state => state.workspaceUsers)
    const workspaceUsersArr = useSelector(state => Object.values(state.workspaceUsers).filter(u => !messageable.workspaceUsers.includes(u.id)))
    const [searchVal, setSearchVal] = useState('');
    const [searchResults, setSearchResults] = useState();

    const handleRemoveItem = (id) => {
        updateMessageMembersArr(messageMembersArr.filter(userId => userId !== id));
    }

    const handleAddItem = (id) => {
        setSearchVal('')
        if (id) updateMessageMembersArr([...messageMembersArr, id]);
    }

    const handleAddSubscriber = () => {
        if (messageable.ownerId) {
            // channel
            messageMembersArr.forEach((workspaceUserId) => {
                dispatch(createChannelSubscription(messageable.id,workspaceUserId));
            })
        } else {
            // direct message
            messageMembersArr.forEach((workspaceUserId) => {
                dispatch(createDirectMessageSubscription(messageable.id, workspaceUserId));
            })
        }

        setShow(false);
    }

    useEffect(() => {
        const filtered = workspaceUsersArr.filter((user) => (!messageMembersArr.includes(user.id) && (user.fullName.includes(searchVal) || (user.displayName && user.displayName.includes(searchVal))))) 
        setSearchResults( filtered.length === 0 ? [{fullName: "No items"}] : filtered )
    }, [searchVal])

    return (
        <div className="edit-channel-container add-people">
            <div className="create-channel-form neg-padding">
                <h2>Add people</h2>
                <div className="channel-input-container">
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
            <footer className="create-channel-footer">
                <button className="unstyled-button cancel-button" onClick={() => setShow(false)}>Cancel</button>
                <button onClick={handleAddSubscriber} className="green-text-button" disabled={messageMembersArr.length === 0}>Add</button>
            </footer>
        </div>
    )
}

export default AddMemberForm;