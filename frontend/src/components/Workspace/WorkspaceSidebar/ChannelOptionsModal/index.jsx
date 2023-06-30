import { useState } from 'react';
import './SidebarOptionsModal.css'
import { Modal } from '../../../../context/Modal';
import CreateChannelModal from '../CreateChannelModal';

const ChannelOptionsModal = ({setShowActions}) => {
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false)
    
    return (
        <>
            <div className="actions-modal-container">
                <div className="actions-modal-item">
                    <button className="actions-modal-create-button actions-button" onClick={() => setShowCreateChannelModal(true)}>
                        <div className='action-text'>Create</div>
                    </button>
                </div>
                <hr className='actions-modal-hr'></hr>
                <div className="actions-modal-item">
                    <button className="actions-modal-manage-button actions-button">
                        <div className='action-text'>Browse channels</div>
                    </button>
                </div>
            </div>
            {showCreateChannelModal && (
                <Modal>
                    <CreateChannelModal
                        setShowActions={setShowCreateChannelModal}/>
                </Modal>
            )}
        </>

    )
}

export default ChannelOptionsModal;