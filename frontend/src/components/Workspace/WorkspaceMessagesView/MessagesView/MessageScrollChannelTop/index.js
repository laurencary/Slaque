import { useState } from "react";
import { HiOutlineHashtag } from "react-icons/hi";
import { useSelector } from "react-redux";

const ChannelTopDetails = ({messageableId}) => {
    const channel = useSelector(state => state.channels[messageableId]);
    const workspaceUser = useSelector(state => state.workspaceUsers[channel.ownerId]);

    return (
        <>
            <div className="message-details-channel-title">
                <HiOutlineHashtag />
                {channel.name}
            </div>
            <div className="message-details-text-container">
                <span>{workspaceUser.displayName ? workspaceUser.displayName : workspaceUser.fullName}</span>
                <span> created this channel on {channel.createdAt}. This is the very beginning of the {} channel.</span>
            </div>
        </>
    )
}

export default ChannelTopDetails;