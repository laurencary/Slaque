import { deleteChannel } from "../../../../../../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import ChannelEditNameForm from "./ChannelEditNameForm";
import ChannelEditDescriptionForm from "./ChannelEditDescriptionForm";
import { useState } from "react";
import { FiTrash2} from "react-icons/fi";
import { createChannelSubscription, deleteChannelSubscription } from "../../../../../../../store/channelSubscriptions";

const ChannelAboutSection = ({ channel, setShow }) => {
    const history = useHistory();
    const { clientId, workspaceId } = useParams();
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const dispatch = useDispatch();
    const [showEditDescription, setShowEditDescription] = useState(false);
    const [showEditName, setShowEditName] = useState(false);
    const channelOwner = useSelector(state => state.workspaceUsers[channel.ownerId]);
    const isChannelMember = useSelector(state => state.currentWorkspace.subscribedChannels.includes(channel.id))

    const handleDelete = () => {
        setShow(false)
        history.push(`/client/${clientId}/${workspaceId}`)
        dispatch(deleteChannel(channel.id))
    }

    const handleJoin = () => {
        dispatch(createChannelSubscription(channel.id, workspaceUserId));
    }

    const handleLeave = () => {
        dispatch(deleteChannelSubscription(channel.id, workspaceUserId))
        history.push(`/client/${clientId}/${workspaceId}/all-channels`)
    }

    return (
        <div className="about-container">
            {channel.ownerId === workspaceUserId ?
                <div className="edit-channel-name">
                    {showEditName ?
                        <ChannelEditNameForm
                            channel={channel}
                            setShow={setShowEditName}
                        /> :
                        <>
                            <div className="name-header">
                                <h2>Name</h2>
                                <button onClick={() => setShowEditName(true)} className="edit-button unstyled-button">Edit</button>
                            </div>
                            <p className="edit-modal-text"># {channel.name}</p>
                        </>}
                </div> : <></>}
            <div className="about-content-container">
                <div className="description-container">
                    {showEditDescription ?
                        <ChannelEditDescriptionForm
                            channel={channel}
                            setShow={setShowEditDescription} /> : 
                        <>
                            <div className="description-header">
                                <h2>Description</h2>
                                <button onClick={() => setShowEditDescription(true)} className="edit-button unstyled-button">Edit</button>
                            </div>
                            {channel.description === null ?
                                <p className="description-placeholder edit-modal-text">Add a description</p> :
                                <p className="edit-modal-text">{channel.description}</p>}
                        </>
                    }
                </div>
                <div className="created-by-container">
                    <div className="created-by-header"><h2>Created by</h2></div>
                    <p className="edit-modal-text">{channelOwner.displayName ? channelOwner.displayName : channelOwner.fullName} on {channel.createdAt}</p>
                </div>
                { isChannelMember ?
                    <div onClick={handleLeave} className="leave-channel-container">
                        <button className="leave-channel-button unstyled-button">Leave Channel</button>
                    </div> :
                    <div onClick={handleJoin} className="join-channel-container">
                        <button className="join-channel-button unstyled-button">Join Channel</button>
                    </div> 
                }
            </div>
            <div>
                {channel.ownerId === workspaceUserId ?
                    <div>
                        <button onClick={handleDelete} className="delete-channel-button">
                            <FiTrash2 />
                            <h2>Delete this channel</h2>
                        </button>
                    </div> : <></>}
            </div>
        </div>
    )
}

export default ChannelAboutSection;