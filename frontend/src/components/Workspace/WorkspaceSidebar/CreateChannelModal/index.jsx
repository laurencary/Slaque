import { HiOutlineHashtag } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import './CreateChannelModal.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createChannel } from "../../../../store/channels";

const CreateChannelModal = ({setShowActions}) => {
    const { workspaceId } = useParams();
    const currentWorkspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId);
    const [channelName, setChannelName] = useState('')
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const channelParams = {
            workspaceId,
            ownerId: currentWorkspaceUserId,
            name: channelName
        }
        dispatch(createChannel(channelParams));
    }

    return (
        <div className="create-channel-modal-container">
            <header className="create-channel-header">
                <h1>Create a channel</h1>
                <button className="close-modal" onClick={() => setShowActions(false)}><FiX /></button>
            </header>
            <div className="create-channel-form">
                <h2>Name</h2>
                <div className="channel-input-container">
                    <HiOutlineHashtag />
                    <input type="text" 
                        placeholder="e.g. plan-budget" 
                        onChange={(e) => setChannelName(e.target.value)}
                        value={channelName}/>
                    <p>{80 - channelName.length}</p>
                </div>
            </div>
            <div className="create-channel-message">Channels are where conversations happen around a topic. Use a
                name that is easy to find and understand.</div>
            <div>
                <footer className="create-channel-footer">
                    <button onClick={handleSubmit} className="green-text-button" disabled={channelName === ""}>Create</button>
                </footer>
            </div>
        </div>
    )
}

export default CreateChannelModal;