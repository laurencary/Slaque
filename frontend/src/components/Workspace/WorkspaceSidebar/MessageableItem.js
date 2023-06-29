import { GoTriangleRight } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import ChannelOptionsModal from "./ChannelOptionsModal";
import { Modal } from "../../../context/Modal";
import CreateChannelModal from "./CreateChannelModal";

const MessageableItem = ({messageableType, show, setShow}) => {
    const [showActions, setShowActions] = useState(false)
    

    return (
        <div className="sidebar-static-item">
            <div className="sidebar-messeagable-arrow-container">
                <GoTriangleRight onClick={() => setShow(!show)} className={show ? "sidebar-messeagable-arrow show-messageable" : "sidebar-messeagable-arrow"} />
            </div>
            <div className="sidebar-static-item-text" onClick={() => setShowActions(true)}>
                <span>{messageableType}</span>
                <span className="sidebar-channel-menu-icon">
                    <svg viewBox="0 0 20 20" >
                        <path fill="currentColor" d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06Z"></path>
                    </svg>
                </span>
            </div>
            {
                messageableType === "Direct messages" ?
                    <span className="open-dm"><FiPlus /></span> : <></>
            }
            {showActions && messageableType === "Channels" && <Modal onClose={() => setShowActions(false)}>
                    <CreateChannelModal setShowActions={setShowActions} /> : <></>
            </Modal>}
        </div>
    )
}
export default MessageableItem;