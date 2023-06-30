import { useState } from "react";
import { updateChannel } from "../../../../../../../store/channels";
import { useDispatch } from "react-redux";
import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";


const AddMemberForm = ({ messageable, setShow }) => {
    const dispatch = useDispatch();
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const [messageMembersArr, updateMessageMembersArr] = useState([])
    const workspaceUsers = useSelector(state => state.workspaceUsers)
    const workspaceUsersArr = useSelector(state => Object.values(state.workspaceUsers).filter(u => !messageable.workspaceUsers.includes(u.id)))
    const [searchVal, setSearchVal] = useState('');

    const handleRemoveItem = (id) => {
        updateMessageMembersArr(messageMembersArr.filter(userId => userId !== id));
    }

    const handleAddItem = (id) => {
        setSearchVal('')
        updateMessageMembersArr([...messageMembersArr, id]);
    }

    const handleAddSubscriber = () => {
        // const subscription = {
        //     id: channel.id,
        //     description: channelDescription
        // }
        // dispatch(updateChannel(updatedChannel));
        setShow(false);
    }

    return (
        <div className="edit-channel-container">
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
                {searchVal && workspaceUsersArr.filter((user) => (!messageMembersArr.includes(user.id) && (user.fullName.includes(searchVal) || (user.displayName && user.displayName.includes(searchVal))))).map((user) => (
                    <div key={`user${user.id}`}
                        onClick={() => handleAddItem(user.id)}
                        className="search-result-user">
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