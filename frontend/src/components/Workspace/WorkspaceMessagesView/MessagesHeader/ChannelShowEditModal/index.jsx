import { HiOutlineHashtag } from "react-icons/hi";
import { useState } from "react";
import ChannelAboutSection from "./ChannelAboutSection";
import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import './ChannelShowEditModal.css'
import MembersSection from "./MembersSection";


const MessageShowEditModal = ({ setShow, messageDetailsName, messageableId, messageableType}) => {
    const [showAbout, setShowAbout] = useState(messageableType === "channel");
    const [showMembers, setShowMembers] = useState(messageableType !== "channel");
    const messageable = useSelector(state => messageableType === "channel" ? state.channels[messageableId] : state.directMessages[messageableId])


    const switchTabs = () => {
        setShowAbout(!showAbout)
        setShowMembers(!showMembers)
    }
    return (
        <div className="edit-message-modal">
            <header className="create-channel-header">
                <h1>{messageableType === "channel" && <HiOutlineHashtag />}{messageDetailsName}</h1>
                <button className="close-modal" onClick={() => setShow(false)}><FiX /></button>
            </header>
            <section className="show-page-tabs">
                {messageableType === "channel" && <div onClick={switchTabs} className={showAbout ? "tab selected-tab" : "tab"}>About</div>}
                <div onClick={switchTabs} className={showMembers ? "tab selected-tab" : "tab"}>Members<span>{messageable.workspaceUsers.length}</span></div>
            </section>
            {showAbout && <ChannelAboutSection 
                channel={messageable}
                messageDetailsName={messageDetailsName}
                setShow={setShow}
            />}
            {showMembers && <MembersSection 
                messageable={messageable}
                />

            }
        </div>
    )
}

export default MessageShowEditModal;