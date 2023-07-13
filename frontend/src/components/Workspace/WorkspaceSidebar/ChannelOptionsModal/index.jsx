import { useState } from 'react';
import './SidebarOptionsModal.css'
import { Modal } from '../../../../context/Modal';
import CreateChannelModal from '../CreateChannelModal';
import { NavLink, useParams } from 'react-router-dom';

const ChannelOptionsModal = ({setShowActions}) => {
    const {clientId, workspaceId} = useParams()
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false)
    const conditionalClose = () => {
        if (!showCreateChannelModal) setShowActions(false)
    }
    
    return (
        <>
            <div className="actions-modal-container" onMouseLeave={conditionalClose}>
                <div className="actions-modal-item">
                    <button className="actions-modal-create-button actions-button" onClick={() => setShowCreateChannelModal(true)}>
                        <div className='action-text'>Create</div>
                    </button>
                </div>
                <hr className='actions-modal-hr'></hr>
                <div className="actions-modal-item">
                    <NavLink to={`/client/${clientId}/${workspaceId}/all-channels`} className='actions-modal-manage-button actions-button action-text'>Browse channels</NavLink>
                </div>
            </div>
            {showCreateChannelModal && (
                <Modal>
                    <CreateChannelModal
                        setShowActions={setShowCreateChannelModal}
                        parentModalShow={setShowActions}/>
                </Modal>
            )}
        </>

    )
}

export default ChannelOptionsModal;