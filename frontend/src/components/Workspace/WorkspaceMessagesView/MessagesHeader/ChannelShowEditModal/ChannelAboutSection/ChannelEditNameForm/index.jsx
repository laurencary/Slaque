import { useState } from "react";
import { HiOutlineHashtag } from "react-icons/hi";
import { updateChannel } from "../../../../../../../store/channels";
import { useDispatch } from "react-redux";

const ChannelEditNameForm = ({channel, setShow}) => {
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState(channel.name)

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
            </div>
            <footer className="create-channel-footer">
                <button className="unstyled-button cancel-button" onClick={() => setShow(false)}>Cancel</button>
                <button onClick={handleUpdate} className="green-text-button" disabled={channelName === "" || channelName === channel.name}>Save Changes</button>
            </footer>
        </div>
    )
}

export default ChannelEditNameForm;