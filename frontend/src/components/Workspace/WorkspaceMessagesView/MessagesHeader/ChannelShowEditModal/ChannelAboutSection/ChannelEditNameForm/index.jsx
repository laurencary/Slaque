import { useState } from "react";
import { HiOutlineHashtag } from "react-icons/hi";
import { updateChannel } from "../../../../../../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormError from "../../../../../../Session/SessionForm/FormError";

const ChannelEditNameForm = ({channel, setShow}) => {
    const dispatch = useDispatch();
    const {workspaceId} = useParams();
    const [channelName, setChannelName] = useState(channel.name)
    const workspaceName = useSelector(state => state.userWorkspaces[workspaceId].name)
    const existingChannelNames = useSelector(state => Object.values(state.channels).map((channel) => channel.name))

    const handleUpdate = () => {
        const updatedChannel = {
            id: channel.id,
            name: channelName
        }
        dispatch(updateChannel(updatedChannel));
        setShow(false);
    }

    return (
        <div className="edit-channel-container">
            <div className="create-channel-form neg-padding">
                <h2>Rename this channel</h2>
                <div className="channel-input-container">
                    <HiOutlineHashtag />
                    <input type="text"
                        placeholder="e.g. plan-budget"
                        onChange={(e) => setChannelName(e.target.value)}
                        value={channelName} />
                    <p>{80 - channelName.length}</p>
                </div>
                {existingChannelNames.includes(channelName) && channelName !== channel.name &&
                    <div className="create-channel-error"><FormError error={`That name is already taken by a channel in ${workspaceName}`} /></div>}
            </div>
            <footer className="create-channel-footer">
                <button className="unstyled-button cancel-button" onClick={() => setShow(false)}>Cancel</button>
                <button onClick={handleUpdate} className="green-text-button" disabled={channelName === "" || channelName === channel.name}>Save Changes</button>
            </footer>
        </div>
    )
}

export default ChannelEditNameForm;