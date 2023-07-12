import { useEffect } from "react";
import { useParams } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, receiveMessage, removeMessage, getMessages } from "../../../../store/messages";
import MessagesHeader from "./MessagesHeader";
import MessagesView from "./MessagesView";
import MessageContentInput from "./MessagesView/MessageContentInput";
import consumer from '../../../../consumer';
import '../WorkspaceMessagesView.css'
import { createChannelSubscription } from "../../../../store/channelSubscriptions";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { HiOutlineHashtag } from "react-icons/hi";

const MessagesPane = ({workspaceId}) => {
    const { messageableCode, clientId } = useParams();
    const dispatch = useDispatch();
    const messages = useSelector(getMessages);
    const messageableType = messageableCode.includes("c") ? "channel" : "directMessage";
    const subChannels = useSelector(state => state.currentWorkspace.subscribedChannels);
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId);
    const messageableId = messageableType === "channel" ? 
        messageableCode.slice(1, 100) * 1 : messageableCode.slice(2, 100) * 1
    const messageName = useSelector(state => {
        // debugger
        if (messageableType === "channel") {
            return state.channels[messageableId].name
        } else {
            const userNameArr = state.directMessages[messageableId].name
            return userNameArr;
        }
    })

    const handleJoin = () => {
        dispatch(createChannelSubscription(messageableId.id, workspaceUserId));
    }

    let messageDetailsName;
    if (messageableType === "channel") {
        messageDetailsName = messageName;
    } else if (messageName.length > 3) {
        let name = messageName.slice(0, 2).join(', ')
        name = name + ', ' + (messageName.length - 2).toString() + ' others'
        messageDetailsName = name;
    } else {
        messageDetailsName = messageName.join(', ')
    }
    
    const messageMembersArr = useSelector(state => {
        if (messageableType === "channel") {
            return state.channels[messageableId].workspaceUsers
        } else {
            return state.directMessages[messageableId].workspaceUsers
        }
    })

    
    useEffect(() => {
        dispatch(fetchMessages(messageableId, messageableType));
        // dispatch(fetchCurrentWorkspace(workspaceId))
        const subscriptionChannel = messageableType === "channel" ? "ChannelsChannel" : "DirectMessagesChannel"

        const subscription = consumer.subscriptions.create(
            { channel: subscriptionChannel, id: messageableId },
            {
                received: ({type, message, id}) => {
                    switch (type) {
                        case 'RECEIVE_MESSAGE':
                            dispatch(receiveMessage(message));
                            break;
                        case 'DESTROY_MESSAGE':
                            dispatch(removeMessage(id));
                        default:
                            console.log('Unhandled broadcast: ', type);
                            break;
                    }
                }
            }
        );
        return () => subscription?.unsubscribe();

    }, [dispatch, messageableId, messageableType])

    useEffect(() => {
        dispatch(fetchMessages(messageableId, messageableType));
        const subscriptionChannel = messageableType === "channel" ? "ChannelsChannel" : "DirectMessagesChannel"

        const subscription = consumer.subscriptions.create(
            { channel: subscriptionChannel, id: messageableId },
            {
                received: ({type, message, id}) => {
                    switch (type) {
                        case 'RECEIVE_MESSAGE':
                            dispatch(receiveMessage(message));
                            break;
                        case 'DESTROY_MESSAGE':
                            dispatch(removeMessage(id));
                        default:
                            console.log('Unhandled broadcast: ', type);
                            break;
                    }
                }
            }
        );
        return () => subscription?.unsubscribe();
    },[])


    return (
        <div className="workspace-primary-view">
            <MessagesHeader messageableType={messageableType}
                messageableId={messageableId}
                messageDetailsName={messageDetailsName}
                messageMembersArr={messageMembersArr} /> 
            <div className="workspace-body-container">
                <MessagesView messageableId={messageableId} 
                    messageableType={messageableType} 
                    messageMembersArr={messageMembersArr} /> 
                <div className="create-message-footer">
                    {(messageableType === "channel" && subChannels.includes(messageableId)) || messageableType !== "channel" ?
                        <MessageContentInput messageableId={messageableId}
                            messageableType={messageableType}
                            messageMembersArr={messageMembersArr}
                            defaultVal={messageableType === "channel" ? "Message #" + messageName : "Message " + messageName.join(", ")}
                            content={''}
                            isCreate={true}
                            message={{}}
                            setShowEditContent={{}}/> :
                        <div className="create-message-container">
                            <h1 className="channel-name">{messageableType === "channel" && <HiOutlineHashtag />}{messageDetailsName}</h1>
                            <div>
                                <button className="green-text-button">Join Channel</button>
                            </div>
                            <NavLink to={`/client/${clientId}/${workspaceId}/all-channels`} className="all-channels-link">Back to all channels</NavLink>
                        </div >}
                    <div className="notifications-footer"></div>
                </div>
            </div>
        </div>  
    )
}

export default MessagesPane;