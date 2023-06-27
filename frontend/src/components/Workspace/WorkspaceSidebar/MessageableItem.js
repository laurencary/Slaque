import { GoTriangleRight } from "react-icons/go";
import { FiPlus } from "react-icons/fi";

const MessageableItem = ({messageableType}) => {
    return (
        <div className="sidebar-static-item">
            <div className="sidebar-messeagable-arrow-container">
                <GoTriangleRight className="sidebar-messeagable-arrow show-messageable" />
            </div>
            <div className="sidebar-static-item-text">
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
        </div>
    )
}
export default MessageableItem;