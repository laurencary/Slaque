import { useState } from "react";
import { useParams } from "react-router-dom/";
import { useDispatch } from "react-redux";
import { createMessage } from "../../../../../store/messages";


const MessageContentInput = ({ messageableId, messageableType, messageMembersArr, defaultVal, content, isCreate }) => {
    const { clientId } = useParams();
    const dispatch = useDispatch();
    const [messageContent, setMessageContent] = useState(content);

    const handleCreateMessage = (e) => {
        e.preventDefault();
        let unreadByWorkspaceUsers = {};
        for (const id of messageMembersArr) {
            if (id !== clientId * 1) {
                unreadByWorkspaceUsers[id] = true
            }
        }
        setMessageContent('')

        const newMessage = {
            workspaceAuthorId: clientId,
            content: messageContent,
            edited: false,
            unreadByWorkspaceUsers,
            messageableId,
            messageableType: messageableType === "channel" ? "Channel" : "DirectMessage"
        }
        dispatch(createMessage(newMessage));
    }

    const handleEditMessage = (e) => {
        e.preventDefault();
        // newMessage = {...}
        const newMessage = {
            workspaceAuthorId: clientId,
            content: messageContent,
            edited: false,
            messageableId,
            messageableType: messageableType === "channel" ? "Channel" : "DirectMessage"
        }
        // dispatch(updateMessage(newMessage));
    }

    return (
        <div className="create-message-container">
            <div className="top-message-options"><strong>B</strong> I</div>
            <div className="content-editable-container">
                {/* <p className="create-message-content" contentEditable="true">{messageableType === "channel" ? "Message #" + messageName : "Message " + messageName.join(", ")}</p> */}
                <form onSubmit={ isCreate ? handleCreateMessage : handleEditMessage }>
                    <textarea className="message-textarea"
                        placeholder={defaultVal}
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}>
                    </textarea>
                </form>
            </div>
            <div className="bottom-message-options">
                <div className="bottom-left-options">@</div>
                <div className="bottom-right-options">
                    <div className="bottom-buttons-container">
                        <span>
                            <button onClick={isCreate ? handleCreateMessage : handleEditMessage} className="create-message-send-button" disabled={messageContent === "" || messageContent.includes(defaultVal)}>
                                <svg viewBox="0 0 20 20" className="create-message-send-icon">
                                    <path fill="currentColor" d="M1.5 2.25a.755.755 0 0 1 1-.71l15.596 7.807a.73.73 0 0 1 0 1.306L2.5 18.46l-.076.018a.749.749 0 0 1-.924-.728v-4.54c0-1.21.97-2.229 2.21-2.25l6.54-.17c.27-.01.75-.24.75-.79s-.5-.79-.75-.79l-6.54-.17A2.253 2.253 0 0 1 1.5 6.789v-4.54Z"></path>
                                </svg>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageContentInput;