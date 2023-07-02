import { useState } from "react";
import { updateChannel } from "../../../../../../../store/channels";
import { useDispatch } from "react-redux";


const ChannelDescriptionForm = ({ channel, setShow }) => {
    const dispatch = useDispatch();
    const [channelDescription, setChannelDescription] = useState(channel.description ? channel.description : '')

    const handleUpdate = () => {
        const updatedChannel = {
            id: channel.id,
            description: channelDescription === '' ? null : channelDescription
        }
        dispatch(updateChannel(updatedChannel));
        setShow(false);
    }

    return (
        <div className="edit-channel-container">
            <div className="create-channel-form neg-padding">
                <h2>Edit description</h2>
                <div className="channel-input-container">
                    <textarea className="message-textarea description-textarea"
                        placeholder={channelDescription ? channelDescription : "Add a description"}
                        onChange={(e) => setChannelDescription(e.target.value)}
                        value={channelDescription}></textarea>
                </div>
                <p className="edit-channel-message">Let people know what this channel is for.</p>
            </div>
            <footer className="create-channel-footer">
                <button className="unstyled-button cancel-button" onClick={() => setShow(false)}>Cancel</button>
                <button onClick={handleUpdate} className="green-text-button" disabled={channelDescription === channel.desciption}>Save Changes</button>
            </footer>
        </div>
    )
}

export default ChannelDescriptionForm;