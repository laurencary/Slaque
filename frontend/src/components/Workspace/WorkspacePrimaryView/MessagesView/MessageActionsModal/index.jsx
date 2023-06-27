import { useDispatch } from 'react-redux'
import './MessageActionsModal.css'
import { deleteMessage } from '../../../../../store/messages';

const MessageActionsModal = ({ messageId, setShowEditContent, setShowActions, setShowActionModal}) => {

    const handleDelete = () => {
        deleteMessage(messageId);
    }

    const handleEditShow = () => {
        setShowEditContent(false);
        setShowActions(false);
        setShowActionModal(false);
    }

    return (
        <div className="message-actions-modal">
            <div className="message-action-edit-container">
                <button onClick={handleEditShow}className="message-action-item">
                    <div className="message-action-edit">Edit message</div>
                </button>
            </div>
            <div className="message-action-delete-container">
                <button onClick={handleDelete} className="message-action-item">
                    <div className="message-action-delete">Delete message...</div>
                </button>
            </div>
        </div>
    )
}

export default MessageActionsModal