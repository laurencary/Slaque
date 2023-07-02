import { useState } from "react";
import { HiOutlineHashtag } from "react-icons/hi";
import { Modal } from "../../../../../context/Modal";
import MessageShowEditModal from "./ChannelShowEditModal";

const MessagesHeader = ({ messageableType, messageDetailsName, messageMembersArr, messageableId }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div className="primary-header-container">
            <header onClick={() => setShowEditModal(true)} className="primary-header-name">
                {messageableType === "channel" ? <HiOutlineHashtag /> : <></>}
                {messageDetailsName}
                <span className="sidebar-team-menu-icon">
                    <svg viewBox="0 0 20 20" >
                        <path fill="currentColor" d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06Z"></path>
                    </svg>
                </span>
            </header>
            <div className="primary-header-users">
                <span>{messageMembersArr.length} members</span>
            </div>
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <MessageShowEditModal 
                        messageableId={messageableId}
                        messageableType={messageableType} 
                        messageDetailsName={messageDetailsName}
                        setShow={setShowEditModal}
                    />
                </Modal>
            )}
        </div>
    )
}

export default MessagesHeader;