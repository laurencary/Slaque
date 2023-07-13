import { HiOutlineHashtag } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import './CreateChannelModal.css'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createChannel } from "../../../../store/channels";
import FormError from "../../../Session/SessionForm/FormError";

const CreateChannelModal = ({setShowActions, parentModalShow}) => {
    const history = useHistory();
    const { workspaceId, clientId } = useParams();
    const workspaceName = useSelector(state => state.userWorkspaces[workspaceId].name)
    const existingChannelNames = useSelector(state => Object.values(state.channels).map((channel) => channel.name))
    const currentWorkspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId);
    const [channelName, setChannelName] = useState('')
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setChannelName('');
        setShowActions(false);
        parentModalShow(false);
        const channelParams = {
            workspaceId,
            ownerId: currentWorkspaceUserId,
            name: channelName
        }
        const id = await dispatch(createChannel(channelParams));
        history.push(`/client/${clientId}/${workspaceId}/c${id}`)
    }

    const closeModals = () => {
        setShowActions(false);
        parentModalShow(false);
    }

    return (
        <div className="create-channel-modal-container">
            <header className="create-channel-header">
                <h1>Create a channel</h1>
                <button className="close-modal" onClick={closeModals}><FiX /></button>
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
                { existingChannelNames.includes(channelName) ?
                    <div className="create-channel-error"><FormError error={`That name is already taken by a channel in ${workspaceName}`} /></div> :
                    <div className="create-channel-message">Channels are where conversations happen around a topic. Use a
                        name that is easy to find and understand.</div>
                }
            <div>
                <footer className="create-channel-footer">
                    <button onClick={handleSubmit} className="green-text-button" disabled={channelName === "" || existingChannelNames.includes(channelName)}>Create</button>
                </footer>
            </div>
        </div>
    )
}

export default CreateChannelModal;