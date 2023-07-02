import { RxDotFilled } from 'react-icons/rx'
import { HiHashtag } from 'react-icons/hi';
import { useState } from 'react';

const ChannelItem = ({channel}) => {
    const [showButtons, setShowButtons] = useState(false);
    

    return (
        <div className='channel-item-container' 
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}>
            <div className='channel-item-left-side'>
                <div className='channel-item-header'>
                    <HiHashtag />
                    <span className='channel-item-header'>{channel.name}</span>
                </div>
                <div className='channel-item-details'>
                    <span className='channel-item-details-text'>{channel.workspaceUsers.length} member{channel.workspaceUsers.length === 1 ? '' : 's'}</span>
                    {channel.description && (
                        <>
                            <span><RxDotFilled size='7px' className='channel-item-details-text dot' /></span>
                            <span className='channel-item-details-text'>{channel.description}</span>
                        </>
                    )}
                </div>
            </div>
            {showButtons && <div className='channel-item-right-side'>
                <button className="unstyled-button cancel-button">View</button>
                <button className='green-text-button'>Join</button>
            </div>}

        </div>
    )
}

export default ChannelItem;