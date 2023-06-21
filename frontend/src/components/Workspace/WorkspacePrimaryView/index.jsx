import { useParams } from "react-router-dom/";
import './WorkspacePrimaryView.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, getMessages } from "../../../store/messages";
import { useEffect } from "react";

const WorkspacePrimaryView = () => {
    const { messageableId } = useParams();
    const dispatch = useDispatch();
    const messages = useSelector(getMessages);
    
    useEffect(() => {
        if (messageableId) {
            const messageableType = messageableId.includes("c") ? "channel" : "directMessage"
            dispatch(fetchMessages(messageableId, messageableType));
        }
    }, [messageableId])

    return messageableId ? (
        <div className="workspace-primary-view">

        </div>
    ) : (<h1 className="workspace-primary-view h1-only">
            Please select a channel or direct message.
            <br></br>
            Happy Slaquing!
        </h1>)
}

export default WorkspacePrimaryView;