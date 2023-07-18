import { RxDotFilled } from 'react-icons/rx'
import { HiHashtag } from 'react-icons/hi';
import { useState } from 'react';
import { createChannelSubscription, deleteChannelSubscription } from '../../../store/channelSubscriptions';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

const ChannelItem = ({channel, isSubscribed}) => {
    const {clientId, workspaceId} = useParams();
    const history = useHistory();
    const [joined, setJoined] = useState(isSubscribed)
    const dispatch = useDispatch();
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const [showButtons, setShowButtons] = useState(false);
    const handleJoin = () => {
        dispatch(createChannelSubscription(channel.id, workspaceUserId));
    }

    const handleLeave = () => {
        dispatch(deleteChannelSubscription(channel.id, workspaceUserId))
        history.push(`/client/${clientId}/${workspaceId}/all-channels`)
        setJoined(false);
    }

    return (
        <NavLink 
            to={`/client/${clientId}/${workspaceId}/c${channel.id}`}
            className='channel-item-container' 
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}>
            <div className='channel-item-left-side'>
                <div className='channel-item-header'>
                    <HiHashtag />
                    <span className='channel-item-header'>{channel.name}</span>
                </div>
                <div className='channel-item-details'>
                    {joined && (
                        <span className='channel-item-details-text green-text'><FiCheck /> Joined <RxDotFilled size='7px' className='channel-item-details-text dot' /></span>
                    )}
                    <span className='channel-item-details-text'>{channel.workspaceUsers.length} member{channel.workspaceUsers.length === 1 ? '' : 's'}</span>
                    {channel.description && (
                        <>
                            <span><RxDotFilled size='7px' className='channel-item-details-text dot' /></span>
                            <span className='channel-item-details-text'>{channel.description}</span>
                        </>
                    )}
                </div>
            </div>
            {showButtons && (joined ? 
                <button
                    onClick={handleLeave} 
                    className="unstyled-button cancel-button">Leave</button> 
                : <div className='channel-item-right-side'>
                    <button className="unstyled-button cancel-button">View</button>
                    <button onClick={handleJoin} className='green-text-button'>Join</button>
            </div>)}

        </NavLink>
    )
}

export default ChannelItem;