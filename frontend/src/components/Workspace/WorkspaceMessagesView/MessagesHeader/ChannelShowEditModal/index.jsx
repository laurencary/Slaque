import { HiOutlineHashtag } from "react-icons/hi";
import { useState } from "react";
import ChannelAboutSection from "./ChannelAboutSection";
import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import './ChannelShowEditModal.css'
import MembersSection from "./MembersSection";


const MessageShowEditModal = ({ setShow, messageDetailsName, messageableId, messageableType}) => {
    const [showAbout, setShowAbout] = useState(true);
    const [showMembers, setShowMembers] = useState(false);
    const channel = useSelector(state => state.channels[messageableId])

    const switchTabs = () => {
        setShowAbout(!showAbout)
        setShowMembers(!showMembers)
    }
    return (
        <div className="edit-message-modal">
            <header className="create-channel-header">
                <h1><HiOutlineHashtag />{messageDetailsName}</h1>
                <button className="close-modal" onClick={() => setShow(false)}><FiX /></button>
            </header>
            <section className="show-page-tabs">
                <div onClick={switchTabs} className={showAbout ? "tab selected-tab" : "tab"}>About</div>
                <div onClick={switchTabs} className={showMembers ? "tab selected-tab" : "tab"}>Members<span>{channel.workspaceUsers.length}</span></div>
            </section>
            {showAbout && <ChannelAboutSection 
                channel={channel}
                messageDetailsName={messageDetailsName}
                setShow={setShow}
            />}
            {showMembers && <MembersSection />

            }
        </div>
    )
}

export default MessageShowEditModal;