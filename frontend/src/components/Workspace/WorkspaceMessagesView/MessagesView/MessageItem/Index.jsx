import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../../../context/Modal";
import MessageActionsModal from "../MessageActionsModal";
import MessageContentInput from "../MessageContentInput";

const MessageItem = ({ message, messageableId, messageableType }) => {
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const [showActions, setShowActions] = useState(false)
    const [showActionModal, setShowActionModal] = useState(false)
    const [showEditContent, setShowEditContent] = useState(false)

    return (
        <div className="message-item"
            onMouseEnter={() => setShowActions(workspaceUserId === message.workspaceAuthorId ? true : false)}
            onMouseLeave={() => setShowActions(false)}
            >
            <div className="message-author-photo img-placeholder"></div>
            {showEditContent ? <MessageContentInput messageableId={messageableId}
                    messageableType={messageableType}
                    messageMembersArr={{}}
                    defaultVal={message.content}
                    content={message.content} 
                    isCreate={false}
                    message={message}
                    setShowEditContent={setShowEditContent}/> :
                <div className="message-details">
                    
                    <div className="message-header">
                        <p className="message-author">{message.authorName}</p>
                        <p className="message-time">{message.displayTime}</p>
                    </div>
                    <p className="message-content">{message.content}<span id="edited-span">{message.edited ? " (edited)" : ""}</span></p>
                </div>
            }
            <div className={showActions && !showEditContent ? "message-item-actions-container" : "hidden"}>
                <div className="message-item-actions" onClick={() => setShowActionModal(true)}>
                    <svg viewBox="0 0 20 20" className="message-items-actions-icon">
                        <path fill="currentColor" d="M10 5.5A1.75 1.75 0 1 1 10 2a1.75 1.75 0 0 1 0 3.5Zm0 6.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm-1.75 4.5a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0Z"></path>
                    </svg>
                </div>
            </div>
            {showActionModal && (
                <Modal onClose={() => setShowActionModal(false)}>
                    <MessageActionsModal messageId={message.id} 
                        setShowEditContent={setShowEditContent}
                        setShowActions={setShowActions}
                        setShowActionModal={setShowActionModal}/>
                </Modal>
            )}
        </div>
    )
}

export default MessageItem;