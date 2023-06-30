
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteDirectMessage } from "../../../../store/directMessages";
import { useParams, useHistory } from "react-router-dom";


const DeleteDirectMessageModal = ({ setShow, directMessageId }) => {
    const {clientId, workspaceId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = () => {
        history.push(`/client/${clientId}/${workspaceId}`)
        setShow(false)
        dispatch(deleteDirectMessage(directMessageId));
    }

    return (
        <div className="create-channel-modal-container">
            <header className="create-channel-header">
                <h1>Are you sure you'd like to continue?</h1>
                <button className="close-modal" onClick={() => setShow(false)}><FiX /></button>
            </header>
            <div className="create-channel-message">
                This will delete the entire conversation, including every message.
            </div>
            <div>
                <footer className="create-channel-footer">
                    <button onClick={handleDelete} className="green-text-button" >Delete</button>
                </footer>
            </div>
        </div>
    )
}

export default DeleteDirectMessageModal;