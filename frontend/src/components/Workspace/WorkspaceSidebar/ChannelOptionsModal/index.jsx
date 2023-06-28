import { useState } from 'react';
import './SidebarOptionsModal.css'
import { Modal } from '../../../../context/Modal';
import CreateChannelModal from '../CreateChannelModal';

const ChannelOptionsModal = () => {
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false)
    console.log(showCreateChannelModal);
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
                <Modal onClose={setShowCreateChannelModal(false)}>
                    <CreateChannelModal />
                </Modal>
            )}
        </>

    )
}

export default ChannelOptionsModal;