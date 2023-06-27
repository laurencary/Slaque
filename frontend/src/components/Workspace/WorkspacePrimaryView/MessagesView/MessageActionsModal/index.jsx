import { useDispatch } from 'react-redux'
import './MessageActionsModal.css'
import { deleteMessage } from '../../../../../store/messages';

const MessageActionsModal = ({messageId}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        deleteMessage(messageId);
    }

    return (
        <div className="message-actions-modal">
            <div className="message-action-edit-container">
                <button className="message-action-item">
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